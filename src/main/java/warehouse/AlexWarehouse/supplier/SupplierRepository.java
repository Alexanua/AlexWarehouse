package warehouse.AlexWarehouse.supplier;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    // Behåll dessa metoder om de matchar din Supplier-klass
    List<Supplier> findByCompanyNameContaining(String companyName);
    Optional<Supplier> findByCompanyName(String companyName);

    // Anpassade frågor som verkar vara korrekta
    @Query("SELECT p.supplier FROM Produkt p WHERE p.id = :productId")
    List<Supplier> findSuppliersByProductId(Long productId);
    List<Supplier> findByContactDetailsContaining(String contactDetails);

    @Query("SELECT s FROM Supplier s JOIN s.products p WHERE p.id = :productId")
    List<Supplier> findByProductId(Long productId);

    @Query("SELECT COUNT(s) FROM Supplier s")
    long countSuppliers();
}
