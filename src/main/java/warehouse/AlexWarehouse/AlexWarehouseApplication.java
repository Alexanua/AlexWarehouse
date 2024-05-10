package warehouse.AlexWarehouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AlexWarehouseApplication {
	public static void main(String[] args) {
		SpringApplication.run(AlexWarehouseApplication.class, args);
	}
}
