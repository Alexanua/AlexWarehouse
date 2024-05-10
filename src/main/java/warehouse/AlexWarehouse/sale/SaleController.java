// src/main/java/warehouse/AlexWarehouse/sale/SaleController.java
package warehouse.AlexWarehouse.sale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:3000")
public class SaleController {
    @Autowired
    private SaleService saleService;

    @GetMapping("/getAllSales")
    public ResponseEntity<List<SaleDTO>> getAllSales() {
        List<SaleDTO> sales = saleService.findAllSales();
        return ResponseEntity.ok(sales);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleDTO> getSaleById(@PathVariable Long id) {
        Optional<SaleDTO> sale = saleService.findSaleById(id);
        return sale.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/createSale")
    public ResponseEntity<SaleDTO> createSale(@RequestBody SaleDTO saleDTO) {
        try {
            SaleDTO createdSale = saleService.saveSale(saleDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSale);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


}
