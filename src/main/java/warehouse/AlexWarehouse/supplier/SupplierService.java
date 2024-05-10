package warehouse.AlexWarehouse.supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public Supplier saveSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found for this id :: " + id));
    }

    public Supplier updateSupplier(Long id, Supplier supplierDetails) {
        Supplier supplier = getSupplierById(id);
        supplier.setCompanyName(supplierDetails.getCompanyName());
        supplier.setContactDetails(supplierDetails.getContactDetails());
        supplier.setEmail(supplierDetails.getEmail());  // Update the email
        supplier.setPhoneNumber(supplierDetails.getPhoneNumber());  // Update the phone number
        return supplierRepository.save(supplier);
    }



    public List<Supplier> findSuppliersByName(String companyName) {
        return supplierRepository.findByCompanyNameContaining(companyName);
    }
}
