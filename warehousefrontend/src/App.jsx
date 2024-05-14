import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListProductComponent from './components/ListProductComponent';
import AddProductForm from './components/AddProductForm';
import UpdateProductComponent from './components/UpdateProductComponent';
import DeleteProductComponent from './components/DeleteProductComponent';
import OldListProductComponent from './components/OldListProductComponent';
import ListSupplierComponent from './components/ListSupplierComponent';
import AddSupplierComponent from './components/AddSupplierComponent';
import UpdateSupplierComponent from './components/UpdateSupplierComponent';
import SaleList from './components/SaleList';
import AddSale from './components/AddSale';
import AlertsComponent from './components/AlertsComponent';
import SaleDetail from './components/SaleDetail';
import ProductComponent from './components/ProductComponent'; // If this needs direct access
import SupplierComponent from './components/SupplierComponent'; // If this needs direct access

const App = () => {
    return (
        <Router>
            <HeaderComponent />
            <div className="content">
                <Routes>
                    <Route path="/" element={<ListProductComponent />} />
                    <Route path="/products" element={<ListProductComponent />} />

                    <Route path="/add-product" element={<AddProductForm />} />
                    <Route path="/edit-product/:productId" element={<UpdateProductComponent />} />
                    <Route path="/delete-product/:productId" element={<DeleteProductComponent />} />
                    <Route path="/old-products" element={<OldListProductComponent />} />
                    <Route path="/suppliers" element={<ListSupplierComponent />} />
                    <Route path="/add-supplier" element={<AddSupplierComponent />} />
                    <Route path="/update-supplier/:supplierId" element={<UpdateSupplierComponent />} />
                    <Route path="/sales" element={<SaleList />} />
                    <Route path="/add-sale" element={<AddSale />} />
                    <Route path="/sale-detail/:saleId" element={<SaleDetail />} />
                    <Route path="/alerts" element={<AlertsComponent />} />
                    <Route path="/product/:productId" element={<ProductComponent />} />
                    <Route path="/supplier/:supplierId" element={<SupplierComponent />} />
                    <Route path="*" element={<div>Not Found</div>} />
                </Routes>
            </div>
            <FooterComponent />
        </Router>
    );
};

export default App;