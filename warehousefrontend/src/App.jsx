/* src/App.jsx */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListProductComponent from './components/ListProductComponent';
import AddProductForm from './components/AddProductForm';
import UpdateProductComponent from './components/UpdateProductComponent';
import ListSupplierComponent from './components/ListSupplierComponent';
import AddSupplierComponent from './components/AddSupplierComponent';
import UpdateSupplierComponent from './components/UpdateSupplierComponent';
import SaleList from './components/SaleList';
import AddSale from './components/AddSale';
import AlertsComponent from './components/AlertsComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import './App.css';
import DeleteProductComponent from "./components/DeleteProductComponent.jsx";

const App = () => {
    return (
        <Router>
            <div className="app">
                <HeaderComponent />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<ListProductComponent />} />
                        <Route path="/add-product" element={<AddProductForm />} />
                        <Route path="/edit-product/:productId" element={<UpdateProductComponent />} />
                        <Route path="/suppliers" element={<ListSupplierComponent />} />
                        <Route path="/add-supplier" element={<AddSupplierComponent />} />
                        <Route path="/edit-supplier/:id" element={<UpdateSupplierComponent />} />
                        <Route path="/sales" element={<SaleList />} />
                        <Route path="/add-sale" element={<AddSale />} />
                        <Route path="/alerts" element={<AlertsComponent />} />
                        <Route path="/delete-product/:productId" element={<DeleteProductComponent />} />

                    </Routes>
                </div>
                <FooterComponent />
            </div>
        </Router>
    );
};

export default App;
