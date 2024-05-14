package warehouse.AlexWarehouse.service;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:3000")
public class AlertController {
    private final NotificationService notificationService;

    public AlertController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/getAllAlerts")
    public List<Alert> getAllAlerts() {
        return notificationService.getAllAlerts();
    }

    @PostMapping("/createAlert")
    public Alert createAlert(@RequestBody String message) {
        return notificationService.createAlert(message);
    }

    @PutMapping("/markAsRead/{id}")
    public void markAlertAsRead(@PathVariable Long id) {
        notificationService.markAlertAsRead(id);
    }

    @DeleteMapping("/clearAlerts")
    public void clearAlerts() {
        notificationService.clearAlerts();
    }
}
