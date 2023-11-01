package GerryCast.restful.api.model;
import org.springframework.data.mongodb.core.mapping.Field;

public class Geometry {
    @Field("type")
    private String type;

    @Field("coordinates")
    private Double[][][][] coordinates;

    public Geometry(String type, Double[][][][] coordinates) {
        this.type = type;
        this.coordinates = coordinates;
    }
}