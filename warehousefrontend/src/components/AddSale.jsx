// src/components/AddSale.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSale = () => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/produkter/getAllProdukter')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        const selectedProduct = products.find(product => product.id === parseInt(productId));
        if (!selectedProduct) {
            setError('Please select a valid product');
            return;
        }

        const sale = {
            produktId: parseInt(productId),
            unitPrice: selectedProduct.pris,
            quantity: parseInt(quantity),
            totalPrice: parseInt(quantity) * selectedProduct.pris,
        };

        try {
            await axios.post('http://localhost:8081/api/sales/createSale', sale);
            navigate('/sales');
        } catch (error) {
            setError('Failed to create sale. ' + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h2>Add Sale</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product:</label>
                    <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
                        <option value="">Select a Product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.namn}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <button type="submit">Add Sale</button>
            </form>
        </div>
    );
};

export default AddSale;
