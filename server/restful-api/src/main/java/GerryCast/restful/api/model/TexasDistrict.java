package GerryCast.restful.api.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;

@Document(collection = "TexasDistrict")
public class TexasDistrict {
    @Id
    private String id;
    private String type;
    private Map<String, Object> properties;
    private Geometry geometry;


    public TexasDistrict(String type, Map<String, Object> properties, Geometry geometry) {
        this.type = type;
        this.properties = properties;
        this.geometry = geometry;
    }
    public static class Geometry {
        private String type;
        private Double[][][][] coordinates;

        public Geometry(String type, Double[][][][] coordinates) {
            this.type = type;
            this.coordinates = coordinates;
        }
    }
}
