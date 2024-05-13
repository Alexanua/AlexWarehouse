package warehouse.AlexWarehouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing

public class AlexWarehouseApplication {
	public static void main(String[] args) {
		SpringApplication.run(AlexWarehouseApplication.class, args);
	}
}
