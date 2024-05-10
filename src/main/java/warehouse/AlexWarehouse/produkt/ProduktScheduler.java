package warehouse.AlexWarehouse.produkt;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
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
            produkt.setHasLowStock(true);
            notificationService.sendLowStockAlert(produkt.getId(), produkt.getNamn(), produkt.getLagerAntal());
        }

        produktRepository.saveAll(lowStockProducts);
    }

    @Scheduled(cron = "0 * * * * *") // كل دقيقة
    public void checkProductExpiration() {
        LocalDate today = LocalDate.now();
        List<Produkt> expiredProducts = produktRepository.findAllByUtgångsdatumBefore(today);

        for (Produkt produkt : expiredProducts) {
            produkt.setHasExpired(true);
            notificationService.sendProductExpirationNotification(produkt.getId(), produkt.getNamn(), produkt.getUtgångsdatum().toString());
        }

        produktRepository.saveAll(expiredProducts);
    }

    // استدعاء تحذيرات النقص مباشرة بعد الشراء
    public void triggerLowStockCheck() {
        checkLowStock();
    }

    public void triggerExpireCheck() {
        checkProductExpiration();
    }
}
