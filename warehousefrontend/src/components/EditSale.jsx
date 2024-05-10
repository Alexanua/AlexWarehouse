// src/components/EditSale.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSaleById, updateSale } from '../service/saleService';
import { listProducts } from '../service/productService';
import { toast, ToastContainer } from 'react-toastify';

const EditSale = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sale, setSale] = useState({
        produktId: '',
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0
    });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchSale = async () => {
            try {
                const data = await getSaleById(id);
                setSale({
                    produktId: data.produkt.id,
                    quantity: data.quantity,
                    unitPrice: data.unitPrice,
                    totalPrice: data.totalPrice
                });
            } catch (error) {
                console.error('Failed to fetch sale', error);
                toast.error('Failed to fetch sale details.');
            }
        };

        const fetchProducts = async () => {
            try {
                const data = await listProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products', error);
                toast.error('Failed to fetch products.');
            }
        };

        fetchSale();
        fetchProducts();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale(prev => ({ ...prev, [name]: value }));

        if (name === 'produktId') {
            const selectedProduct = products.find(product => product.id === parseInt(value));
            if (selectedProduct) {
                setSale(prev => ({ ...prev, unitPrice: selectedProduct.pris }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSale = {
            produkt: { id: parseInt(sale.produktId) },
            quantity: parseInt(sale.quantity),
            unitPrice: parseFloat(sale.unitPrice),
            totalPrice: parseFloat(sale.quantity) * parseFloat(sale.unitPrice)
        };
        try {
            await updateSale(id, updatedSale);
            toast.success('Sale updated successfully!');
            navigate('/sales');
        } catch (error) {
            console.error('Failed to update sale', error);
            toast.error('Failed to update sale.');
        }
    };

    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <h2>Edit Sale</h2>
                <div>
                    <label>Product:</label>
                    <select name="produktId" value={sale.produktId} onChange={handleChange} required>
                        <option value="" disabled>Select a product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.namn}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={sale.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <div>
                    <label>Unit Price:</label>
                    <input
                        type="number"
                        name="unitPrice"
                        value={sale.unitPrice}
                        onChange={handleChange}
                        step="0.01"
                        readOnly
                    />
                </div>
                <div>
                    <label>Total Price:</label>
                    <input
                        type="number"
                        name="totalPrice"
                        value={(sale.quantity * sale.unitPrice).toFixed(2)}
                        readOnly
                    />
                </div>
                <button type="submit">Update Sale</button>
                <button type="button" onClick={() => navigate('/sales')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditSale;
