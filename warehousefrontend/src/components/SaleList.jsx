// src/components/SaleList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SaleList = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:8081/api/sales';

    const fetchSales = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getAllSales`);
            setSales(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching sales:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>List of Sales</h2>
            <button onClick={() => navigate('/add-sale')}>Add Sale</button>
            <button onClick={fetchSales}>Refresh Sales</button>
            <table>
                <thead>
                <tr>
                    <th>Sale ID</th>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sales.length > 0 ? (
                    sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.produktNamn}</td>
                            <td>${sale.unitPrice.toFixed(2)}</td>
                            <td>{sale.quantity}</td>
                            <td>${sale.totalPrice.toFixed(2)}</td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No sales available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default SaleList;
