// src/main/java/warehouse/AlexWarehouse/sale/SaleService.java
package warehouse.AlexWarehouse.sale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import warehouse.AlexWarehouse.produkt.Produkt;
import warehouse.AlexWarehouse.produkt.ProduktRepository;
import warehouse.AlexWarehouse.service.NotificationService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SaleService {
    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private ProduktRepository produktRepository;

    @Autowired
    private NotificationService notificationService;

    public List<SaleDTO> findAllSales() {
        return saleRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<SaleDTO> findSaleById(Long id) {
        return saleRepository.findById(id).map(this::convertToDTO);
    }

    public SaleDTO saveSale(SaleDTO saleDTO) {
        Produkt produkt = produktRepository.findById(saleDTO.getProduktId()).orElseThrow(
                () -> new RuntimeException("Product not found with ID: " + saleDTO.getProduktId())
        );

        Sale sale = convertToEntity(saleDTO);
        sale.setProdukt(produkt);

        // Ensure unitPrice is set correctly
        sale.setUnitPrice(produkt.getPris());

        // Calculate totalPrice
        sale.setTotalPrice(sale.getQuantity() * sale.getUnitPrice());

        Sale savedSale = saleRepository.save(sale);

        // Update product stock and trigger alerts
        produkt.setLagerAntal(produkt.getLagerAntal() - sale.getQuantity());
        if (produkt.getLagerAntal() < 5) {
            produkt.setHasLowStock(true);
            notificationService.sendLowStockAlert(produkt.getId(), produkt.getNamn(), produkt.getLagerAntal());
        }
        if (produkt.getUtgångsdatum() != null && produkt.getUtgångsdatum().isBefore(LocalDate.now())) {
            produkt.setHasExpired(true);
            notificationService.sendProductExpirationNotification(produkt.getId(), produkt.getNamn(), produkt.getUtgångsdatum().toString());
        }
        produktRepository.save(produkt);

        return convertToDTO(savedSale);
    }

    public void deleteSale(Long id) {
        saleRepository.deleteById(id);
    }

    private SaleDTO convertToDTO(Sale sale) {
        return new SaleDTO(
                sale.getId(),
                sale.getProdukt().getId(),
                sale.getProdukt().getNamn(),
                sale.getUnitPrice(),
                sale.getQuantity(),
                sale.getTotalPrice()
        );
    }

    private Sale convertToEntity(SaleDTO saleDTO) {
        Sale sale = new Sale();
        sale.setId(saleDTO.getId());
        sale.setQuantity(saleDTO.getQuantity());
        sale.setUnitPrice(saleDTO.getUnitPrice());
        sale.setTotalPrice(saleDTO.getTotalPrice());
        return sale;
    }
}

