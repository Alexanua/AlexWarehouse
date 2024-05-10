// src/components/HeaderComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeaderComponent.css'; // Ensure this path is correct

const HeaderComponent = () => {
    return (
        <header className="header">
            <h1>AlexWarehouse</h1>
            <nav>
                <Link to="/">Products</Link>
                <Link to="/suppliers">Suppliers</Link>
                <Link to="/sales">Sales</Link>
                <Link to="/alerts">Alerts</Link>
            </nav>
        </header>
    );
};

export default HeaderComponent;
