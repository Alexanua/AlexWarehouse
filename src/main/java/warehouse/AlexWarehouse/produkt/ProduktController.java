package warehouse.AlexWarehouse.produkt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produkter")
@CrossOrigin(origins = "http://localhost:3000")
public class ProduktController {

    @Autowired
    private ProduktService produktService;

    @GetMapping("/getAllProdukter")
    public ResponseEntity<List<Produkt>> getAllProdukter() {
        List<Produkt> produkter = produktService.getAllProdukter();
        return ResponseEntity.ok(produkter);
    }

    @GetMapping("/getProduktById/{id}")
    public ResponseEntity<Produkt> getProduktById(@PathVariable Long id) {
        Optional<Produkt> produkt = produktService.getProduktById(id);
        return produkt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/createProdukt")
    public ResponseEntity<Produkt> createProdukt(@RequestBody Produkt produkt) {
        Produkt createdProdukt = produktService.createProdukt(produkt);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProdukt);
    }

    @PutMapping("/updateProdukt/{id}")
    public ResponseEntity<Produkt> updateProdukt(@PathVariable Long id, @RequestBody Produkt produkt) {
        Optional<Produkt> existingProdukt = produktService.getProduktById(id);
        if (existingProdukt.isPresent()) {
            produkt.setId(id);
            Produkt updatedProdukt = produktService.updateProdukt(produkt);
            return ResponseEntity.ok(updatedProdukt);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteProdukt/{id}")
    public ResponseEntity<Void> deleteProdukt(@PathVariable Long id) {
        produktService.deleteProdukt(id);
        return ResponseEntity.noContent().build();
    }
}
