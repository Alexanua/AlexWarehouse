package warehouse.AlexWarehouse.service;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private String alertType;
    private String message;
    private LocalDateTime alertTime;
    private boolean isRead;

    // المُنشئ الافتراضي
    public Alert() {}

    // مُنشئ يأخذ جميع البارامترات
    public Alert(Long productId, String alertType, String message, LocalDateTime alertTime, boolean isRead) {
        this.productId = productId;
        this.alertType = alertType;
        this.message = message;
        this.alertTime = alertTime;
        this.isRead = isRead;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getAlertType() {
        return alertType;
    }

    public void setAlertType(String alertType) {
        this.alertType = alertType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getAlertTime() {
        return alertTime;
    }

    public void setAlertTime(LocalDateTime alertTime) {
        this.alertTime = alertTime;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }
}
