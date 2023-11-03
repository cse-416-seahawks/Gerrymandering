package GerryCast.restful.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import GerryCast.restful.api.repository.GeoJSONRepository;
import GerryCast.restful.api.model.TexasDistrict;
import org.springframework.stereotype.Service;
@Service
public class TexasGeoJSONService {
    private final GeoJSONRepository geoJSONRepository;

    @Autowired
    public TexasGeoJSONService(GeoJSONRepository geoJSONRepository) {
        this.geoJSONRepository = geoJSONRepository;
    }

    public List<TexasDistrict> getAllGeoJSONEntities() {
        return geoJSONRepository.findAll();
    }
}
