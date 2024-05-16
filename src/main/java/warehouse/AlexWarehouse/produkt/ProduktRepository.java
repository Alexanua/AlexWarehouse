package warehouse.AlexWarehouse.produkt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProduktRepository extends JpaRepository<Produkt, Long> {
    List<Produkt> findAllByLagerAntalLessThan(int lagerAntal);
    List<Produkt> findAllByUtgångsdatumBefore(LocalDate date);
    List<Produkt> findAllByUtgångsdatumBetween(LocalDate startDate, LocalDate endDate);
}
