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

    @Scheduled(cron = "0 * * * * *")
    public void checkAllAlerts() {
        checkLowStock();
        checkExpiredProducts();
        checkExpiringSoonProducts();
    }

    private void checkLowStock() {
        List<Produkt> lowStockProducts = produktRepository.findAllByLagerAntalLessThan(5);

        for (Produkt produkt : lowStockProducts) {
            produkt.setHasLowStock(true);
            produktRepository.save(produkt);
            System.out.println("Low stock alert for product: " + produkt.getNamn());
            notificationService.sendLowStockAlert(produkt.getId(), produkt.getNamn(), produkt.getLagerAntal());
        }
    }

    private void checkExpiredProducts() {
        LocalDate today = LocalDate.now();
        List<Produkt> expiredProducts = produktRepository.findAllByUtgångsdatumBefore(today);

        for (Produkt produkt : expiredProducts) {
            produkt.setHasExpired(true);
            produktRepository.save(produkt);
            System.out.println("Expiration alert for product: " + produkt.getNamn());
            notificationService.sendProductExpirationNotification(produkt.getId(), produkt.getNamn(), produkt.getUtgångsdatum().toString());
        }
    }

    private void checkExpiringSoonProducts() {
        LocalDate today = LocalDate.now();
        LocalDate thresholdDate = today.plusDays(5); //
        List<Produkt> expiringSoonProducts = produktRepository.findAllByUtgångsdatumBetween(today, thresholdDate);

        for (Produkt produkt : expiringSoonProducts) {
            produkt.setExpiresSoon(true);
            produktRepository.save(produkt);
            System.out.println("Expiring soon alert for product: " + produkt.getNamn());
            notificationService.sendProductExpiringSoonNotification(produkt.getId(), produkt.getNamn(), produkt.getUtgångsdatum().toString());
        }
    }
}
