// src/components/SaleDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSaleById, deleteSale } from '../service/saleService';

const SaleDetail = () => {
    const [sale, setSale] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSale = async () => {
            try {
                const fetchedSale = await getSaleById(id);
                setSale(fetchedSale);
            } catch (error) {
                console.error('Failed to fetch sale:', error);
            }
        };
        fetchSale();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteSale(id);
            alert('Sale deleted successfully');
            navigate('/sales');
        } catch (error) {
            console.error('Failed to delete sale:', error);
            alert('Failed to delete sale');
        }
    };

    if (!sale) return <p>Loading...</p>;

    return (
        <div>
            <h2>Sale Detail</h2>
            <p>ID: {sale.id}</p>
            <p>Product Name: {sale.produktNamn}</p>
            <p>Unit Price: ${sale.unitPrice.toFixed(2)}</p>
            <p>Quantity: {sale.quantity}</p>
            <p>Total Price: ${sale.totalPrice.toFixed(2)}</p>
            <button onClick={() => navigate('/sales')}>Back to Sales List</button>
            <button onClick={handleDelete}>Delete Sale</button>
        </div>
    );
};

export default SaleDetail;
