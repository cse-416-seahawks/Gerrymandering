package GerryCast.restful.api.service;
import java.util.List;

import org.springframework.stereotype.Service;

import GerryCast.restful.api.model.TexasDistrict;
@Service
public interface GeoJSONService {
    List<TexasDistrict> getAllGeoJSONEntities();
}
