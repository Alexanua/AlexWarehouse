// src/components/OldListProductComponent.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OldListProductComponent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Hämta lista över produkter
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Funktion för att radera en produkt
    const deleteProduct = (productId) => {
        axios.delete(`/api/products/${productId}`)
            .then(response => {
                // Ta bort produkten från state efter framgångsrik radering
                setProducts(products.filter(product => product.id !== productId));
                alert('Product deleted successfully.');
            })
            .catch(error => {
                // Hantera fel
                const errorMessage = error.response ? error.response.data.message : 'Unknown error';
                console.error('Failed to delete product:', errorMessage);
                alert(`Failed to delete product: ${errorMessage}`);
            });
    };

    return (
        <div>
            <h2>List of Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name}
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OldListProductComponent;
