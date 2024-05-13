// src/main/java/warehouse/AlexWarehouse/produkt/ProduktRepository.java
package warehouse.AlexWarehouse.produkt;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProduktRepository extends JpaRepository<Produkt, Long> {
    List<Produkt> findAllByLagerAntalLessThan(int lagerAntal);

    List<Produkt> findAllByUtgångsdatumBefore(LocalDate date);

    Optional<Produkt> findByNamn(String namn);
}