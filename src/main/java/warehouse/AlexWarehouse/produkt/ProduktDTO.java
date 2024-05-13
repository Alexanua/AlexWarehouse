package warehouse.AlexWarehouse.produkt;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ProduktDTO {
    private Long id;
    private String namn;
    private String beskrivning;
    private double pris;
    private int lagerAntal;
    private String kategori;
    private double vikt;
    private LocalDate utgångsdatum;
    private String bildUrl;
    private String status;
    private String dimensioner;
    private String färg;
    private String material;
    private double betyg;
    private String tillverkningsland;

    public Produkt tillProdukt() {
        Produkt produkt = new Produkt();
        produkt.setId(this.id);
        produkt.setNamn(this.namn);
        produkt.setBeskrivning(this.beskrivning);
        produkt.setPris(this.pris);
        produkt.setLagerAntal(this.lagerAntal);
        produkt.setKategori(this.kategori);
        produkt.setVikt(this.vikt);
        produkt.setUtgångsdatum(this.utgångsdatum);
        produkt.setBildUrl(this.bildUrl);
        produkt.setStatus(this.status);
        produkt.setDimensioner(this.dimensioner);
        produkt.setFärg(this.färg);
        produkt.setMaterial(this.material);
        produkt.setBetyg(this.betyg);
        produkt.setTillverkningsland(this.tillverkningsland);
        return produkt;
    }
}