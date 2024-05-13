package warehouse.AlexWarehouse.produkt;


import java.util.List;
import java.util.Optional;

public interface ProduktService {
    List<Produkt> getAllProdukter();
    Optional<Produkt> getProduktById(Long id);
    Produkt createProdukt(Produkt produkt);
    Produkt updateProdukt(Produkt produkt);
    void deleteProdukt(Long id);
}