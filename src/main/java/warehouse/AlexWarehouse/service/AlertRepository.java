// src/main/java/warehouse/AlexWarehouse/service/AlertRepository.java
package warehouse.AlexWarehouse.service;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Long> {
}