package GerryCast.restful.api.controller;

import org.geotools.feature.FeatureCollection;
import org.geotools.feature.collection.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import com.google.gson.Gson;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DistrictController {
    private final MongoDatabase db;

    @Autowired
    public DistrictController(MongoDatabase db, Double[] stateMapCoordinates) {
        this.db = db;
    }

    public MongoCollection<Document> getStateCollection(@PathVariable final String state) {
        if (state.equals("TEXAS")) {
            return db.getCollection("Texas");
        } else if (state.equals("VIRGINIA")) {
            return db.getCollection("Virginia");
        } else if (state.equals("NEVADA")) {
            return db.getCollection("Nevada");
        }
        return null;
    }

    @GetMapping("/getMapCoordinatesData/")
    public ResponseEntity<String> getMapCoordinatesData() {
        MongoCollection<Document> stateCollection = db.getCollection("StatesData");

        Document document = stateCollection.find().first();
        Gson gson = new Gson();
        String json = gson.toJson(document);
        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    @GetMapping("/getStateOutline/{state}")
    public ResponseEntity<String> getStateOutline(@PathVariable final String state) {
        MongoCollection<Document> stateCollection = getStateCollection(state);

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        FindIterable<Document> documents = stateCollection.find();

        List<Document> dList = new ArrayList<>();

        for (Document d : documents) {
            dList.add(d);
        }

        if (dList.isEmpty()) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        }

        Gson gson = new Gson();
        String json = gson.toJson(dList);
        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    @GetMapping("/getCurrentDistrictPlan/{state}")
    public ResponseEntity<String> getCurrentDistrictPlan(@PathVariable final String state) {
        MongoCollection<Document> stateCollection = null;
        Document docFinder = new Document("type", "FeatureCollection").append("planId", "ORIGINAL");
        if (state.equals("TEXAS")) {
            stateCollection = db.getCollection("TexasPlans");
        } else if (state.equals("VIRGINIA")) {
            stateCollection = db.getCollection("VirginiaPlans");
        } else if (state.equals("NEVADA")) {
            stateCollection = db.getCollection("NevadaPlans");
        }

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document document = stateCollection.find(docFinder).first();

        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getStateEnsembles/{state}")
    public ResponseEntity<String> getStateEnsembles(@PathVariable final String state) {
        MongoCollection<Document> stateCollection = getStateCollection(state);

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("type", "EnsembleData");
        Document document = stateCollection.find(docFinder).first();

        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getClusterSummaryData/{state}/{ensembleId}/{distanceMeasure}")
    public ResponseEntity<String> getClusterSummaryData(@PathVariable final String state,
            @PathVariable final String ensembleId, @PathVariable final String distanceMeasure) {
        MongoCollection<Document> stateCollection = getStateCollection(state);

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("type", "ClusterData").append("ensemble_id", ensembleId)
                .append("distance_measure", distanceMeasure);
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @PostMapping("/updateClusterName/{state}/{ensembleId}/{distanceMeasure}/{clusterId}/{newName}")
    public ResponseEntity<String> updateClusterName(@PathVariable final String state,
            @PathVariable final String ensembleId, @PathVariable final String distanceMeasure,
            @PathVariable final String clusterId, @PathVariable final String newName) {
        MongoCollection<Document> stateCollection = getStateCollection(state);

        String dist = "Hamming Distance";
        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("type", "ClusterData").append("ensemble_id", ensembleId)
                .append("distance_measure", dist);
        Document document = stateCollection.find(docFinder).first();

        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        }

        Object dataObj = document.get("data");

        if (dataObj == null) {
            return new ResponseEntity<>("Data not found.", HttpStatus.NOT_FOUND);
        }

        List<Document> data = (List<Document>) dataObj;
        for (Document d : data) {
            if (d.get("cluster_id").equals(clusterId)) {

                d.put("name", newName);
                stateCollection.replaceOne(docFinder, document);

                Gson gson = new Gson();
                String json = gson.toJson(document);
                return new ResponseEntity<>(json, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Unable to POST.", HttpStatus.OK);
    }

    @GetMapping("/getClusterDetails/{state}/{clusterId}")
    public ResponseEntity<String> getClusterDetails(@PathVariable final String state,
            @PathVariable final String clusterId) {
        MongoCollection<Document> stateCollection = getStateCollection(state);

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("type", "DistrictPlanData").append("cluster_id", clusterId);
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getDistrictPlanGeoJSON/{state}/{districtPlanId}")
    public ResponseEntity<String> getDistrictPlanGeoJSON(@PathVariable final String state,
            @PathVariable final String districtPlanId) {
        MongoCollection<Document> stateCollection = null;

        if (state.equals("TEXAS")) {
            stateCollection = db.getCollection("TexasPlans");
        } else if (state.equals("VIRGINIA")) {
            stateCollection = db.getCollection("VirginiaPlans");
        } else if (state.equals("NEVADA")) {
            stateCollection = db.getCollection("NevadaPlans");
        }

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("type", "FeatureCollection").append("features", new Document("$elemMatch", new Document("properties.PLANID", districtPlanId)));
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getTypicalPlan/{state}/{clusterId}")
    public ResponseEntity<String> getTypicalPlan(@PathVariable final String state,
            @PathVariable final String clusterId) {
        MongoCollection<Document> stateCollection = null;

        if (state.equals("TEXAS")) {
            stateCollection = db.getCollection("TexasPlans");
        } else if (state.equals("VIRGINIA")) {
            stateCollection = db.getCollection("VirginiaPlans");
        } else if (state.equals("NEVADA")) {
            stateCollection = db.getCollection("NevadaPlans");
        }

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("type", "FeatureCollection").append("cluster_id", clusterId);
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getClusterSplits/{state}/{clusterId}")
    public ResponseEntity<String> getClusterSplits(@PathVariable final String state,
            @PathVariable final String clusterId) {
        MongoCollection<Document> stateCollection = null;

        if (state.equals("TEXAS")) {
            stateCollection = db.getCollection("Texas");
        } else if (state.equals("VIRGINIA")) {
            stateCollection = db.getCollection("Virginia");
        } else if (state.equals("NEVADA")) {
            stateCollection = db.getCollection("Nevada");
        }

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("type", "ClusterSplitData").append("cluster_id", clusterId);
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getMDSClusterGraphData/{state}/{ensembleId}/{distanceMeasure}")
    public ResponseEntity<String> getMDSClusterGraphData(@PathVariable final String state,
            @PathVariable final String ensembleId, @PathVariable final String distanceMeasure) {
        MongoCollection<Document> stateCollection = getStateCollection(state);

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("graph_type", "MDSPlotOfClusters").append("ensemble_id", ensembleId)
                .append("distance_measure", distanceMeasure);
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getClusterGraphData/{state}/{ensembleId}/{distanceMeasure}")
    public ResponseEntity<String> getClusterGraphData(@PathVariable final String state,
            @PathVariable final String ensembleId, @PathVariable final String distanceMeasure) {
        MongoCollection<Document> stateCollection = getStateCollection(state);

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("graph_type", "ScatterPlotOfClusters").append("ensemble_id", ensembleId)
                .append("distance_measure", distanceMeasure);
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getDistrictPlanGraphData/{state}/{clusterId}")
    public ResponseEntity<String> getDistrictPlanGraphData(@PathVariable final String state,
            @PathVariable final String clusterId) {
        MongoCollection<Document> stateCollection = getStateCollection(state);

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("graph_type", "MDSPlotOfDistrictPlans").append("cluster_id", clusterId);
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getDistanceMeasureData/{state}/{ensembleId}")
    public ResponseEntity<String> getDistanceMeasureData(@PathVariable final String state,
            @PathVariable final String ensembleId) {
        MongoCollection<Document> stateCollection = getStateCollection(state);

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("type", "DistanceMeasuresData").append("ensemble_id", ensembleId);
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getAssociationData/{state}")
    public ResponseEntity<String> getAssociationData(@PathVariable final String state) {
        MongoCollection<Document> stateCollection = getStateCollection(state);

        if (stateCollection == null) {
            return new ResponseEntity<>("Input a valid state.", HttpStatus.BAD_REQUEST);
        }

        Document docFinder = new Document("type", "AssociationData");
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }
}