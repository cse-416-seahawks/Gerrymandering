package GerryCast.restful.api.controller;

import GerryCast.restful.api.model.District;
import GerryCast.restful.api.model.TexasDistrict;
import GerryCast.restful.api.repository.GeoJSONRepository;
import GerryCast.restful.api.service.GeoJSONService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.google.gson.Gson;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DistrictController{

    private final MongoDatabase db;

    @GetMapping("/")
    public String welcome(){
        return "Welcome to SeaHawks Server";
    }
    @PostMapping("/District")
    public ResponseEntity<District> createState(@RequestBody final District District){
        return ResponseEntity.status(HttpStatus.CREATED).contentType(MediaType.APPLICATION_JSON).body(District);
    }
    @GetMapping("/District")
    public List<District> getAllDistricts(){
        List<District> l = new ArrayList<District>();
        l.add(new District(UUID.randomUUID().toString(), 1, "D", "Roem"));
        l.add(new District(UUID.randomUUID().toString(), 2, "R", "Adams"));
        l.add(new District(UUID.randomUUID().toString(), 3, "D", "Yu"));

        return l;
    }
    @GetMapping("/District/{id}")
    public District getDistrictById(@PathVariable final int id){
        int rand = (int)Math.round(Math.random());
        String party;
        String lastName = "";
        if(rand == 0)
            party = "D";
        else
            party = "R";
        
        Random rand2 = new Random();
        for(int i = 0; i < rand2.nextInt(5)+3; i++){
            lastName += (char)(rand2.nextInt(26)+97);
        }
        lastName = lastName.substring(0, 1).toUpperCase()+lastName.substring(1);
        return new District(UUID.randomUUID().toString(), id, party, lastName);
    }
    @GetMapping("/getInformation/{state}/{ensemble}/{cluster}")
    public String getInformation(@PathVariable final String state, @PathVariable final int ensemble,@PathVariable final int cluster){
        return "State: "+ state + "\n"+ "Ensemble: "+ ensemble + "\n"+"Cluster: "+ cluster;
    }



    // private final GeoJSONService geoJSONService;
    @Autowired
    public DistrictController(MongoDatabase db) {
        this.db = db;
    }
    
    @GetMapping("/checkDatabase")
    public String checkDatabase() {
        String connectedDatabase = db.getName();
        return "Connected to database: " + connectedDatabase;
    }

    @GetMapping("/getStateOutline/{state}")
    public ResponseEntity<String> getStateOutline(@PathVariable final String state){
        MongoCollection<Document> geojsons = null;

        if(state.equals("TEXAS")){
            geojsons = db.getCollection("Texas");
        }
        if(state.equals("VIRGINIA")){
            geojsons = db.getCollection("Virginia");
        }
        
        if(state.equals("NEVADA")){
            geojsons = db.getCollection("Nevada");
        }

        if(geojsons == null){
            return new ResponseEntity<>("Input a valid state, put in the correct two letter capitalized abbreviation of the state.", HttpStatus.BAD_REQUEST);
        }

        FindIterable<Document> documents = geojsons.find();

        List<Document> dList = new ArrayList<>();

        for (Document d: documents) {
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
        MongoCollection<Document> geojsons = null;


        if(state.equals("TEXAS")){
            geojsons = db.getCollection("TexasDistrict");
        }
        if(state.equals("VIRGINIA")){
            geojsons = db.getCollection("VirginiaDistrict");
        }
        
        if(state.equals("NEVADA")){
            geojsons = db.getCollection("NevadaDistrict");
        }

        if(geojsons == null){
            return new ResponseEntity<>("Input a valid state, put in the state in all capitalization.", HttpStatus.BAD_REQUEST);
        }

        FindIterable<Document> documents = geojsons.find();

        List<Document> dList = new ArrayList<>();

        for (Document d: documents) {
            dList.add(d);
        }
        if (dList.isEmpty()) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        }
        
        
        Gson gson = new Gson();
        String json = gson.toJson(dList);
        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    @GetMapping("/getStateEnsembles/{state}")
    public ResponseEntity<String> getStateEnsembles(@PathVariable final String state) {
        MongoCollection<Document> stateCollection = null;

        if(state.equals("TEXAS")){
            stateCollection = db.getCollection("Texas");
        }
        if(state.equals("VIRGINIA")){
            stateCollection = db.getCollection("Virginia");
        }
        
        if(state.equals("NEVADA")){
            stateCollection = db.getCollection("Nevada");
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
    public ResponseEntity<String> getClusterSummaryData(@PathVariable final String state, @PathVariable final String ensembleId, @PathVariable final String distanceMeasure) {
        MongoCollection<Document> stateCollection = null;

        if(state.equals("TEXAS")){
            stateCollection = db.getCollection("Texas");
        }
        if(state.equals("VIRGINIA")){
            stateCollection = db.getCollection("Virginia");
        }
        
        if(state.equals("NEVADA")){
            stateCollection = db.getCollection("Nevada");
        }

        Document docFinder = new Document("type", "ClusterData").append("ensemble_id", ensembleId).append("distance_measure", distanceMeasure);
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getClusterDetails/{state}/{districtPlanIds}")
    public ResponseEntity<String> getClusterDetails(@PathVariable final String state, @PathVariable final String[] districtPlanIds) {
        MongoCollection<Document> stateCollection = null;
        
        if(state.equals("TEXAS")){
            stateCollection = db.getCollection("Texas");
        }
        if(state.equals("VIRGINIA")){
            stateCollection = db.getCollection("Virginia");
        }
        if(state.equals("NEVADA")){
            stateCollection = db.getCollection("Nevada");
        }

        List<String> districtPlans = new ArrayList<>();
        for (String id: districtPlanIds) {
            Document docFinder = new Document("type", "DistrictPlanData").append("district_plan_id", id);
            Document document = stateCollection.find(docFinder).first();
            if (document == null) {
                return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
            } else {
                Gson gson = new Gson();
                String json = gson.toJson(document);
                districtPlans.add(json);
            }
        }
        String districtPlansJson = "[" + String.join(",", districtPlans) + "]";
        return new ResponseEntity<>(districtPlansJson, HttpStatus.OK);
    }

    @GetMapping("/getDistrictPlanGeoJSON/{state}/{districtPlanId}")
    public ResponseEntity<String> getDistrictPlanGeoJSON(@PathVariable final String state, @PathVariable final String districtPlanId) {
        MongoCollection<Document> stateCollection = null;
        
        if(state.equals("TEXAS")){
            stateCollection = db.getCollection("TexasDistrict");
        }
        if(state.equals("VIRGINIA")){
            stateCollection = db.getCollection("VirginiaDistrict");
        }
        if(state.equals("NEVADA")){
            stateCollection = db.getCollection("NevadaDistrict");
        }

        Document docFinder = new Document("type", "DistrictPlanGeoJSON").append("district_plan_id", districtPlanId);
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
    public ResponseEntity<String> getClusterGraphData(@PathVariable final String state, @PathVariable final String ensembleId, @PathVariable final String distanceMeasure) {
        MongoCollection<Document> stateCollection = null;
        
        if(state.equals("TEXAS")){
            stateCollection = db.getCollection("Texas");
        }
        if(state.equals("VIRGINIA")){
            stateCollection = db.getCollection("Virginia");
        }
        
        if(state.equals("NEVADA")){
            stateCollection = db.getCollection("Nevada");
        }

        Document docFinder = new Document("graph_type", "ScatterPlotOfClusters").append("ensemble_id", ensembleId).append("distance_measure", distanceMeasure);
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
    public ResponseEntity<String> getDistrictPlanGraphData(@PathVariable final String state, @PathVariable final String clusterId) {
        MongoCollection<Document> stateCollection = null;
        
        if(state.equals("TEXAS")){
            stateCollection = db.getCollection("Texas");
        }
        if(state.equals("VIRGINIA")){
            stateCollection = db.getCollection("Virginia");
        }
        
        if(state.equals("NEVADA")){
            stateCollection = db.getCollection("Nevada");
        }

        Document docFinder = new Document("type", "ScatterPlotOfDistrictPlans").append("cluster_id", clusterId);
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
    public ResponseEntity<String> getDistanceMeasureData(@PathVariable final String state, @PathVariable final String ensembleId) {
        MongoCollection<Document> stateCollection = null;
        
        if(state.equals("TEXAS")){
            stateCollection = db.getCollection("Texas");
        }
        if(state.equals("VIRGINIA")){
            stateCollection = db.getCollection("Virginia");
        }
        
        if(state.equals("NEVADA")){
            stateCollection = db.getCollection("Nevada");
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
        MongoCollection<Document> stateCollection = null;
        
        if(state.equals("TEXAS")){
            stateCollection = db.getCollection("Texas");
        }
        if(state.equals("VIRGINIA")){
            stateCollection = db.getCollection("Virginia");
        }
        
        if(state.equals("NEVADA")){
            stateCollection = db.getCollection("Nevada");
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