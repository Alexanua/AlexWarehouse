import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import warehouse.AlexWarehouse.service.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {
    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<String> getAllAlerts() {
        return notificationService.getAllAlerts();
    }

    @DeleteMapping
    public void clearAlerts() {
        notificationService.clearAlerts();
    }
}
