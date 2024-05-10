package warehouse.AlexWarehouse.supplier;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import warehouse.AlexWarehouse.produkt.Produkt;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "suppliers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String contactDetails; // Consider renaming or splitting into more specific fields
    private String email; // New field for email
    private String phoneNumber; // New field for phone number

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    private Set<Produkt> products = new HashSet<>();





}
