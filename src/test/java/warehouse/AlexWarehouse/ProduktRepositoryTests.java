package warehouse.AlexWarehouse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import warehouse.AlexWarehouse.produkt.Produkt;
import warehouse.AlexWarehouse.produkt.ProduktRepository;

import static org.junit.jupiter.api.Assertions.*;


@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)


@ExtendWith(SpringExtension.class)
@DataJpaTest
public class ProduktRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ProduktRepository produktRepository;

    @Test
    public void testFindById() {
        // Skapa och persist en ny produkt
        Produkt nyProdukt = new Produkt();
        nyProdukt.setNamn("Testprodukt");
        // ... sätt andra egenskaper ...

        nyProdukt = entityManager.persistAndFlush(nyProdukt);

        // Använd produktRepository för att hämta produkten
        Produkt hittadProdukt = produktRepository.findById(nyProdukt.getId()).orElse(null);

        // Verifiera att den hittade produkten matchar den insatta produkten
        assertNotNull(hittadProdukt);
        assertEquals(nyProdukt.getNamn(), hittadProdukt.getNamn());
        // ... verifiera andra egenskaper ...
    }

    @Test
    public void testUpdateProdukt() {
        // Lägg till en ny produkt
        Produkt produkt = new Produkt();
        produkt.setNamn("Uppdaterbar Produkt");
        // ... sätt andra egenskaper ...
        produkt = entityManager.persistAndFlush(produkt);

        // Ändra någon egenskap
        produkt.setNamn("Uppdaterad Namn");
        produktRepository.save(produkt);

        // Hämta den uppdaterade produkten
        Produkt uppdateradProdukt = produktRepository.findById(produkt.getId()).orElse(null);

        // Verifiera att uppdateringen gick igenom
        assertNotNull(uppdateradProdukt);
        assertEquals("Uppdaterad Namn", uppdateradProdukt.getNamn());
    }

    @Test
    public void testDeleteProdukt() {
        // Lägg till och persistera en produkt
        Produkt produkt = new Produkt();
        produkt.setNamn("Raderbar Produkt");
        // ... sätt andra egenskaper ...
        produkt = entityManager.persistAndFlush(produkt);

        // Radera produkten
        produktRepository.deleteById(produkt.getId());

        // Försäkra att produkten är borta
        Produkt raderadProdukt = produktRepository.findById(produkt.getId()).orElse(null);
        assertNull(raderadProdukt);
    }

    // Du kan lägga till fler tester för olika metoder i ditt repository här
}
