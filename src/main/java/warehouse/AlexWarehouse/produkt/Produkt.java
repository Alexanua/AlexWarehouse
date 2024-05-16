package warehouse.AlexWarehouse.produkt;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import warehouse.AlexWarehouse.supplier.Supplier;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "produkts", indexes = {
        @Index(name = "idx_namn", columnList = "namn"),
        @Index(name = "idx_kategori", columnList = "kategori"),
        @Index(name = "idx_supplier_id", columnList = "supplier_id")
})
public class Produkt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Namn får inte vara tomt")
    @Size(max = 255, message = "Namn måste vara mellan 1 och 255 tecken")
    private String namn;

    private String beskrivning;

    @DecimalMin(value = "0.0", message = "Pris måste vara ett positivt tal")
    private double pris;

    private LocalDate utgångsdatum;

    @PositiveOrZero(message = "Lagerantal måste vara ett icke-negativt tal")
    private int lagerAntal;

    private String kategori;

    private double vikt;
    private LocalDate expiryDate;
    private String bildUrl;
    private String status;
    private String dimensioner;
    private String färg;
    private String material;
    private boolean isRead;

    @DecimalMin(value = "0.0", message = "Betyg måste vara ")
    private double betyg;

    private String tillverkningsland;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate;

    private boolean deleted = false;

    private boolean hasLowStock = false;
    private boolean hasExpired = false;
    private boolean expiresSoon = false;

    public boolean isHasLowStock() {
        return hasLowStock;
    }

    public void setHasLowStock(boolean hasLowStock) {
        this.hasLowStock = hasLowStock;
    }

    public boolean isHasExpired() {
        return hasExpired;
    }

    public void setHasExpired(boolean hasExpired) {
        this.hasExpired = hasExpired;
    }

    public boolean isExpiresSoon() {
        return expiresSoon;
    }

    public void setExpiresSoon(boolean expiresSoon) {
        this.expiresSoon = expiresSoon;
    }
}
