package warehouse.AlexWarehouse.sale;// SaleRepository.java
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}
