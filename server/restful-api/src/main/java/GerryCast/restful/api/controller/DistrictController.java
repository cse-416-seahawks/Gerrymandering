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

    @GetMapping("/getOutline/{state}")
    public ResponseEntity<String> getOutline(@PathVariable final String state){
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
    

    
    @GetMapping("/getInformation/{state}")
    public ResponseEntity<String> getAllGeoJSONEntities(@PathVariable final String state) {
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

    @GetMapping("/getEnsembleData/{state}")
    public ResponseEntity<String> getEnsembleData(@PathVariable final String state) {
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

    @GetMapping("/getClusterData/{state}/{ensembleId}/{distanceMeasure}")
    public ResponseEntity<String> getClusterData(@PathVariable final String state, @PathVariable final int ensembleId, @PathVariable final String distanceMeasure) {
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

        Document docFinder = new Document("type", "ClusterData").append("ensembleId", ensembleId).append("distanceMeasure", distanceMeasure);
        Document document = stateCollection.find(docFinder).first();
        if (document == null) {
            return new ResponseEntity<>("Documents not found.", HttpStatus.NOT_FOUND);
        } else {
            Gson gson = new Gson();
            String json = gson.toJson(document);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }
    }

    @GetMapping("/getDistrictPlan/{state}")
    public ResponseEntity<String> getDistrictPlan(@PathVariable final String state) {
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

        Document docFinder = new Document("type", "DistrictPlanData");
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