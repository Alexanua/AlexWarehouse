// src/main/java/warehouse/AlexWarehouse/service/StockAlertScheduler.java
package warehouse.AlexWarehouse.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import warehouse.AlexWarehouse.produkt.Produkt;
import warehouse.AlexWarehouse.produkt.ProduktRepository;

import java.time.LocalDate;
import java.util.List;

@Component
public class StockAlertScheduler {
    private final ProduktRepository produktRepository;
    private final NotificationService notificationService;

    public StockAlertScheduler(ProduktRepository produktRepository, NotificationService notificationService) {
        this.produktRepository = produktRepository;
        this.notificationService = notificationService;
    }

    @Scheduled(cron = "0 * * * * *") // كل دقيقة
    public void lowStockAlert() {
        List<Produkt> lowStockProducts = produktRepository.findAllByLagerAntalLessThan(5);

        for (Produkt produkt : lowStockProducts) {
            produkt.setHasLowStock(true);
            notificationService.sendLowStockAlert(produkt.getId(), produkt.getNamn(), produkt.getLagerAntal());
        }

        produktRepository.saveAll(lowStockProducts);
    }

    @Scheduled(cron = "0 * * * * *") // كل دقيقة
    public void checkExpiredProducts() {
        LocalDate today = LocalDate.now();
        List<Produkt> expiredProducts = produktRepository.findAllByUtgångsdatumBefore(today);

        for (Produkt produkt : expiredProducts) {
            produkt.setHasExpired(true);
            notificationService.sendProductExpirationNotification(produkt.getId(), produkt.getNamn(), produkt.getUtgångsdatum().toString());
        }

        produktRepository.saveAll(expiredProducts);
    }
}
