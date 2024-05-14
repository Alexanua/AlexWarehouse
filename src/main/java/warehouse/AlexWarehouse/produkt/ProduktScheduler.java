package warehouse.AlexWarehouse.produkt;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import warehouse.AlexWarehouse.produkt.Produkt;
import warehouse.AlexWarehouse.produkt.ProduktRepository;
import warehouse.AlexWarehouse.service.NotificationService;

import java.time.LocalDate;
import java.util.List;

@Component
public class ProduktScheduler {
    private final ProduktRepository produktRepository;
    private final NotificationService notificationService;

    public ProduktScheduler(ProduktRepository produktRepository, NotificationService notificationService) {
        this.produktRepository = produktRepository;
        this.notificationService = notificationService;
    }

    @Scheduled(cron = "0 * * * * *") // كل دقيقة
    public void checkLowStock() {
        List<Produkt> lowStockProducts = produktRepository.findAllByLagerAntalLessThan(5);

        for (Produkt produkt : lowStockProducts) {
            System.out.println("Low stock alert for product: " + produkt.getNamn()); // Logging
            notificationService.sendLowStockAlert(produkt.getId(), produkt.getNamn(), produkt.getLagerAntal());
        }
    }

    @Scheduled(cron = "0 * * * * *") // كل دقيقة
    public void checkExpiredProducts() {
        LocalDate today = LocalDate.now();
        List<Produkt> expiredProducts = produktRepository.findAllByUtgångsdatumBefore(today);

        for (Produkt produkt : expiredProducts) {
            System.out.println("Expiration alert for product: " + produkt.getNamn()); // Logging
            notificationService.sendProductExpirationNotification(produkt.getId(), produkt.getNamn(), produkt.getUtgångsdatum().toString());
        }
    }

    @Scheduled(cron = "0 * * * * *") // كل دقيقة
    public void checkExpiringSoonProducts() {
        LocalDate today = LocalDate.now();
        LocalDate thresholdDate = today.plusDays(5); // ضبط فترة الإنذار على 5 أيام
        List<Produkt> expiringSoonProducts = produktRepository.findAllByUtgångsdatumBefore(thresholdDate);

        for (Produkt produkt : expiringSoonProducts) {
            System.out.println("Expiring soon alert for product: " + produkt.getNamn()); // Logging
            notificationService.sendProductExpiringSoonNotification(produkt.getId(), produkt.getNamn(), produkt.getUtgångsdatum().toString());
        }
    }
}
