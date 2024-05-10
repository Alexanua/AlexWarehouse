import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProductComponent = () => {
    const { productId } = useParams(); // This matches the route parameter
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:8081/produkter';

    const [product, setProduct] = useState({
        namn: '',
        beskrivning: '',
        pris: 0, // initialized as a number
        lagerAntal: 0, // initialized as a number
        kategori: '',
        vikt: 0, // initialized as a number
        utgångsdatum: '',
        bildUrl: '',
        status: '',
        dimensioner: '',
        färg: '',
        material: '',
        betyg: 0, // initialized as a number
        tillverkningsland: '',
        supplierId: 0 // initialized as a number
    });

    useEffect(() => {
        if (productId) {
            axios.get(`${API_BASE_URL}/getProduktById/${productId}`)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => console.error('Error fetching product details:', error));
        }
    }, [productId, API_BASE_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (productId) {
            axios.put(`${API_BASE_URL}/updateProdukt/${productId}`, product)
                .then(() => {
                    alert('Product updated successfully');
                    navigate('/products'); // Navigate to product listing after update
                })
                .catch(error => {
                    console.error('Failed to update product:', error);
                    alert('Failed to update product');
                });
        } else {
            alert('Product ID is missing. Cannot update the product.');
        }
    };

    return (
        <div>
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="namn" value={product.namn} onChange={handleChange} required />
                <label>Description:</label>
                <input type="text" name="beskrivning" value={product.beskrivning} onChange={handleChange} required />
                <label>Price:</label>
                <input type="number" name="pris" value={product.pris} onChange={handleChange} required />
                <label>Stock:</label>
                <input type="number" name="lagerAntal" value={product.lagerAntal} onChange={handleChange} required />
                <label>Category:</label>
                <input type="text" name="kategori" value={product.kategori} onChange={handleChange} required />
                <label>Weight:</label>
                <input type="text" name="vikt" value={product.vikt} onChange={handleChange} required />
                <label>Expiration Date:</label>
                <input type="date" name="utgångsdatum" value={product.utgångsdatum} onChange={handleChange} required />
                <label>Image URL:</label>
                <input type="text" name="bildUrl" value={product.bildUrl} onChange={handleChange} />
                <label>Status:</label>
                <input type="text" name="status" value={product.status} onChange={handleChange} required />
                <label>Dimensions:</label>
                <input type="text" name="dimensioner" value={product.dimensioner} onChange={handleChange} />
                <label>Color:</label>
                <input type="text" name="färg" value={product.färg} onChange={handleChange} required />
                <label>Material:</label>
                <input type="text" name="material" value={product.material} onChange={handleChange} required />
                <label>Rating:</label>
                <input type="number" name="betyg" value={product.betyg} onChange={handleChange} />
                <label>Country of Manufacture:</label>
                <input type="text" name="tillverkningsland" value={product.tillverkningsland} onChange={handleChange} required />
                <label>Supplier ID:</label>
                <input type="number" name="supplierId" value={product.supplierId} onChange={handleChange} required />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProductComponent;
