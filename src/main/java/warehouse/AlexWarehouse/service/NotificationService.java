package warehouse.AlexWarehouse.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private AlertRepository alertRepository;

    public void sendLowStockAlert(Long productId, String productName, int stock) {
        Alert alert = new Alert(null, productId, "Low Stock", "Low stock for product " + productName + " (ID: " + productId + "), stock: " + stock, LocalDateTime.now(), false);
        alertRepository.save(alert);
    }

    public void sendProductExpirationNotification(Long productId, String productName, String expiryDate) {
        Alert alert = new Alert(null, productId, "Expired", "Product " + productName + " (ID: " + productId + ") expired on " + expiryDate, LocalDateTime.now(), false);
        alertRepository.save(alert);
    }

    public void sendProductExpiringSoonNotification(Long productId, String productName, String expiryDate) {
        Alert alert = new Alert(null, productId, "Expiring Soon", "Product " + productName + " (ID: " + productId + ") is expiring soon on " + expiryDate, LocalDateTime.now(), false);
        alertRepository.save(alert);
    }

    public Alert createAlert(String message) {
        Alert alert = new Alert(null, null, "Custom", message, LocalDateTime.now(), false);
        return alertRepository.save(alert);
    }

    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    public void markAlertAsRead(Long id) {
        Alert alert = alertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Alert not found"));
        alert.setRead(true);
        alertRepository.save(alert);
    }

    public void clearAlerts() {
        alertRepository.deleteAll();
    }
}
