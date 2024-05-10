import React from 'react';
import './App.css';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

function App() {
    return (
        <div className="App">
            <h1>Product Management System</h1>
            <ProductList />
            <AddProduct />
        </div>
    );
}

export default App;
