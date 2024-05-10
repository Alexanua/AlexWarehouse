package warehouse.AlexWarehouse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@ExtendWith(SpringExtension.class)
@SpringBootTest // Detta kommer att starta hela applikationens kontext
@AutoConfigureMockMvc // Detta kommer att konfigurera MockMvc
public class ProduktControllerTests {

    @Autowired
    private MockMvc mockMvc; // MockMvc injiceras här

    // Metoden setup() är inte nödvändig om du inte har någon extra konfiguration
    @BeforeEach
    public void setup() {
        // Du kan lägga till konfiguration för MockMvc här om det behövs
    }

    @Test
    public void testCreateProduct() throws Exception {
        String produktJson = "{\"namn\":\"Test Produkt\",\"beskrivning\":\"En beskrivning\",\"pris\":100.0}";

        mockMvc.perform(post("/produkter/createProdukt") // Använder post() metoden från MockMvcRequestBuilders
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(produktJson))
                .andExpect(status().isOk()) // Förväntar sig att HTTP status är OK
                .andExpect(content().contentType(MediaType.APPLICATION_JSON)); // och innehållet är JSON
    }

    // Lägg till fler tester för andra endpoints
}
