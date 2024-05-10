// src/main/java/warehouse/AlexWarehouse/service/NotificationService.java
package warehouse.AlexWarehouse.service;

import org.springframework.stereotype.Service;
import warehouse.AlexWarehouse.produkt.Produkt;
import warehouse.AlexWarehouse.produkt.ProduktRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {
    private final ProduktRepository produktRepository;
    private final List<String> alerts = new ArrayList<>();

    public NotificationService(ProduktRepository produktRepository) {
        this.produktRepository = produktRepository;
    }

    public void sendLowStockAlert(Long produktId, String produktName, int lagerAntal) {
        // In-app alert
        Produkt produkt = produktRepository.findById(produktId).orElseThrow();
        produkt.setHasLowStock(true);
        produktRepository.save(produkt);

        String alertMessage = String.format("Product %s has only %d items left.", produktName, lagerAntal);
        alerts.add(alertMessage);

        // Optionally log the alert
        System.out.println(alertMessage);
    }

    public void sendProductExpirationNotification(Long produktId, String produktName, String expirationDate) {
        // In-app alert
        Produkt produkt = produktRepository.findById(produktId).orElseThrow();
        produkt.setHasExpired(true);
        produktRepository.save(produkt);

        String alertMessage = String.format("Product %s expired on %s.", produktName, expirationDate);
        alerts.add(alertMessage);

        // Optionally log the alert
        System.out.println(alertMessage);
    }

    public List<String> getAllAlerts() {
        return new ArrayList<>(alerts);
    }

    public void clearAlerts() {
        alerts.clear();
    }
}
