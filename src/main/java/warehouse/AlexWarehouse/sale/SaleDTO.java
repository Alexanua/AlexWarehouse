// src/main/java/warehouse/AlexWarehouse/sale/SaleDTO.java
package warehouse.AlexWarehouse.sale;

public class SaleDTO {
    private Long id;
    private Long produktId; // Kontrollera att produktId finns och är korrekt
    private String produktNamn; // Kontrollera att produktNamn finns och är korrekt
    private double unitPrice;
    private int quantity;
    private double totalPrice;

    public SaleDTO() {}

    public SaleDTO(Long id, Long produktId, String produktNamn, double unitPrice, int quantity, double totalPrice) {
        this.id = id;
        this.produktId = produktId;
        this.produktNamn = produktNamn;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    // Getters och Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProduktId() {
        return produktId;
    }

    public void setProduktId(Long produktId) {
        this.produktId = produktId;
    }

    public String getProduktNamn() {
        return produktNamn;
    }

    public void setProduktNamn(String produktNamn) {
        this.produktNamn = produktNamn;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
