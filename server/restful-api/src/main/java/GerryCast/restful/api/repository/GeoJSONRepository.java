package GerryCast.restful.api.repository;

import GerryCast.restful.api.model.TexasDistrict;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GeoJSONRepository extends MongoRepository<TexasDistrict, String> {
    
}