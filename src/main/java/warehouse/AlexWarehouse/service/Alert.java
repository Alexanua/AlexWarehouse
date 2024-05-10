// src/main/java/warehouse/AlexWarehouse/service/Alert.java
package warehouse.AlexWarehouse.service;

public class Alert {
    private Long productId;
    private String alertType;
    private String message;

    public Alert(Long productId, String alertType, String message) {
        this.productId = productId;
        this.alertType = alertType;
        this.message = message;
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
}
