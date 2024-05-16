##AlexWarehouse
AlexWarehouse is a warehouse management system designed to streamline the management of products, suppliers, and sales. The system includes features for tracking low-stock and expired products, sending notifications, and managing product-related data efficiently.

Table of Contents
Features
Technologies Used
Project Structure
Installation
Configuration
Usage
Contributing
License
Features
Product Management: Add, update, delete, and list products.
Supplier Management: Manage supplier information linked to products.
Sales Management: Track and manage sales, with restrictions on updating or deleting sales.
Alerts: Notifications for low-stock and expired products.
Scheduled Tasks: Hourly checks for product alerts.
Technologies Used
Backend: Spring Boot, Spring Data JPA, Spring Mail, Hibernate
Frontend: React, Vite
Database: MySQL
Build Tools: Maven
Other: Jackson for JSON processing, Lombok for reducing boilerplate code
Project Structure
Backend
WebConfig.java: Configuration for web settings and static resources.
Produkt.java: Entity class representing products.
ProduktService.java: Interface for product service operations.
ProduktServiceImpl.java: Implementation of product service operations.
ProduktRepository.java: Repository interface for product data access.
ProduktController.java: REST controller for handling product-related HTTP requests.
ProduktDTO.java: Data Transfer Object for product data.
ProduktScheduler.java: Scheduler for checking product alerts.
ProduktSchedulerController.java: Controller for managing scheduler operations.
Frontend
Components
AddProductForm.jsx: Form for adding new products.
AddSale.jsx: Component for adding new sales.
AddSupplierComponent.jsx: Form for adding new suppliers.
AlertsComponent.jsx: Displays alerts for low-stock and expired products.
DeleteProductComponent.jsx: Component for deleting products.
FooterComponent.jsx: Footer of the application.
HeaderComponent.jsx: Header of the application displaying the application name.
ListProductComponent.jsx: Lists all products.
OldListProductComponent.jsx: Backup of the old version of the product listing component.
ListSupplierComponent.jsx: Lists all suppliers.
ProductComponent.jsx: Displays detailed information about a product.
SaleDetail.jsx: Displays detailed information about a sale.
SaleList.jsx: Lists all sales.
SupplierComponent.jsx: Displays detailed information about a supplier.
UpdateProductComponent.jsx: Form for updating existing products.
UpdateSupplierComponent.jsx: Form for updating existing suppliers.
Services
productService.js: Service for managing product-related API calls.
saleService.js: Service for managing sales-related API calls.
supplierService.js: Service for managing supplier-related API calls.
AlertService.js: Service for managing alert-related API calls.
Styles
App.css: General styles for the application.
UpdateProductComponent.css: Styles for the UpdateProductComponent.
ListProductComponent.css: Styles for the ListProductComponent.
HeaderComponent.css: Styles for the HeaderComponent.
supplierStyles.css: Styles for supplier-related components.
AlertsComponent.css: Styles for the AlertsComponent.
index.css: Global styles.
Other Files
App.jsx: Main application component.

main.jsx: Entry point of the React application.

.eslintrc.cjs: ESLint configuration file.

file.env: Environment variables configuration.

package.json: Project dependencies and scripts.

The frontend interface covers the full screen with a dark background.

Navigation options and a header displaying the application name.

Installation
Clone the repository
bash
Copy code
git clone https://github.com/your-username/AlexWarehouse.git
cd AlexWarehouse
Backend Setup
Ensure you have Java 17 and Maven installed.
Configure MySQL database with the following settings:
properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/smart-majdi?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
Build the backend:
bash
Copy code
mvn clean install -DskipTests
Frontend Setup
Navigate to the frontend directory:
bash
Copy code
cd frontend
Install dependencies:
bash
Copy code
npm install
Build the frontend:
bash
Copy code
npm run build
Configuration
The backend runs on port 8081 and connects to a MySQL database.
Static resources are served from the frontend/build directory.
Scheduled tasks for checking product alerts are configured to run every hour.
Usage
Run the Backend
bash
Copy code
java -jar target/AlexWarehouse-0.0.1-SNAPSHOT.jar
Access the Frontend
Open a browser and navigate to http://localhost:8081.
Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
