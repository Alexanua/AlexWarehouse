package warehouse.AlexWarehouse.produkt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProduktServiceImpl implements ProduktService {
    private static final Logger log = LoggerFactory.getLogger(ProduktServiceImpl.class);
    private final ProduktRepository produktRepository;

    @Autowired
    public ProduktServiceImpl(ProduktRepository produktRepository) {
        this.produktRepository = produktRepository;
    }

    @Override
    public List<Produkt> getAllProdukter() {
        return produktRepository.findAll();
    }

    @Override
    public Optional<Produkt> getProduktById(Long id) {
        return produktRepository.findById(id);
    }

    @Override
    public Produkt createProdukt(Produkt produkt) {
        if (produkt.getCreatedDate() == null) {
            produkt.setCreatedDate(LocalDateTime.now());
            log.info("Automatically setting createdDate for produkt: {}", produkt);
        }
        log.info("Saving produkt with createdDate: {}", produkt.getCreatedDate());
        return produktRepository.save(produkt);
    }

    @Override
    public Produkt updateProdukt(Produkt produkt) {
        if (produkt.getLastModifiedDate() == null) {
            produkt.setLastModifiedDate(LocalDateTime.now());
        }
        return produktRepository.save(produkt);
    }

    @Override
    public void deleteProdukt(Long id) {
        produktRepository.deleteById(id);
    }
}