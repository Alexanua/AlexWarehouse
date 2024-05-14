package warehouse.AlexWarehouse.produkt;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/scheduler")
public class ProduktSchedulerController {
    private final ProduktScheduler produktScheduler;

    public ProduktSchedulerController(ProduktScheduler produktScheduler) {
        this.produktScheduler = produktScheduler;
    }

    @GetMapping("/test-expire-alert")
    public String testExpireAlert() {
        produktScheduler.checkExpiredProducts();
        return "Product expiration check triggered.";
    }

    @GetMapping("/test-low-stock-alert")
    public String testLowStockAlert() {
        produktScheduler.checkLowStock();
        return "Low stock alert check triggered.";
    }

    @GetMapping("/test-expiring-soon-alert")
    public String testExpiringSoonAlert() {
        produktScheduler.checkExpiringSoonProducts();
        return "Expiring soon alert check triggered.";
    }
}
