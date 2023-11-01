package GerryCast.restful.api.config;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// @Configuration
// public class MongoDBConfig {
//     @Bean
//     public MongoDatabase mongoDatabase() {
//         MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
//         return mongoClient.getDatabase("StateMap");
//     }
// }

@Configuration
public class MongoDBConfig {
    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(mongoUri);
    }

    @Bean
    public MongoDatabase mongoDatabase() {
        MongoClient mongoClient = mongoClient();
        return mongoClient.getDatabase("StateMap");
    }
}