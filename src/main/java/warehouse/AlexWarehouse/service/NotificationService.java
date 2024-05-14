package warehouse.AlexWarehouse.service;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private AlertRepository alertRepository;

    // إرسال تنبيه بانخفاض المخزون
    public void sendLowStockAlert(Long productId, String productName, int stock) {
        // منطق إرسال التنبيه
        Alert alert = new Alert(productId, "Low Stock", "Low stock for product " + productName + " (ID: " + productId + "), stock: " + stock, LocalDateTime.now(), false);
        alertRepository.save(alert);
        System.out.println(alert.getMessage());
    }

    // إرسال تنبيه بانتهاء صلاحية المنتج
    public void sendProductExpirationNotification(Long productId, String productName, String expiryDate) {
        // منطق إرسال التنبيه
        Alert alert = new Alert(productId, "Expired", "Product " + productName + " (ID: " + productId + ") expired on " + expiryDate, LocalDateTime.now(), false);
        alertRepository.save(alert);
        System.out.println(alert.getMessage());
    }

    // إرسال تنبيه باقتراب انتهاء صلاحية المنتج
    public void sendProductExpiringSoonNotification(Long productId, String productName, String expiryDate) {
        // منطق إرسال التنبيه
        Alert alert = new Alert(productId, "Expiring Soon", "Product " + productName + " (ID: " + productId + ") is expiring soon on " + expiryDate, LocalDateTime.now(), false);
        alertRepository.save(alert);
        System.out.println(alert.getMessage());
    }

    // إنشاء تنبيه جديد
    public Alert createAlert(String message) {
        Alert alert = new Alert(null, "Custom", message, LocalDateTime.now(), false);
        return alertRepository.save(alert);
    }

    // الحصول على جميع التنبيهات
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    // تمييز التنبيه كمقروء
    public void markAlertAsRead(Long id) {
        System.out.println("Marking alert " + id + " as read");
        Alert alert = alertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Alert not found"));
        alert.setRead(true);
        alertRepository.save(alert);
        System.out.println("Alert " + id + " marked as read");
    }


    // مسح جميع التنبيهات
    public void clearAlerts() {
        alertRepository.deleteAll();
    }
}
