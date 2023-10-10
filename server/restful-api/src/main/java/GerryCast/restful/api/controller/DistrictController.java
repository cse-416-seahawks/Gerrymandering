package GerryCast.restful.api.controller;

import GerryCast.restful.api.model.District;

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


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DistrictController{

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

}