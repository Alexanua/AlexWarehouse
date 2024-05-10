// src/components/Dashboard.jsx
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProductsList from './ListProductComponent';
import SuppliersList from './ListSupplierComponent';
import SalesList from './SaleList';

function Dashboard() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/suppliers">Suppliers</Link></li>
                    <li><Link to="/sales">Sales</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/products" element={<ProductsList />} />
                <Route path="/suppliers" element={<SuppliersList />} />
                <Route path="/sales" element={<SalesList />} />
            </Routes>
        </div>
    );
}

export default Dashboard;
