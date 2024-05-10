import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const [product, setProduct] = useState({
        namn: '',
        beskrivning: '',
        pris: '',
        lagerAntal: '',
        kategori: '',
        vikt: '',
        utgångsdatum: '',
        bildUrl: '',
        status: '',
        dimensioner: '',
        färg: '',
        material: '',
        betyg: '',
        tillverkningsland: '',
        supplierId: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validation for numeric fields to prevent negative values
        const positiveFields = ["pris", "lagerAntal", "vikt", "betyg"];
        if (positiveFields.includes(name) && parseFloat(value) < 0) {
            alert(`${name.charAt(0).toUpperCase() + name.slice(1)} cannot be negative.`);
            return; // Stop updating the state for negative values
        }
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/produkter/createProdukt', product);
            console.log('Product Added:', response.data);
            navigate('/products');
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="namn" value={product.namn} onChange={handleChange} required />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" name="beskrivning" value={product.beskrivning} onChange={handleChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" name="pris" value={product.pris} onChange={handleChange} required />
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" name="lagerAntal" value={product.lagerAntal} onChange={handleChange} required />
            </div>
            <div>
                <label>Category:</label>
                <input type="text" name="kategori" value={product.kategori} onChange={handleChange} required />
            </div>
            <div>
                <label>Weight:</label>
                <input type="number" name="vikt" value={product.vikt} onChange={handleChange} required />
            </div>
            <div>
                <label>Expiration Date:</label>
                <input type="date" name="utgångsdatum" value={product.utgångsdatum} onChange={handleChange} required />
            </div>
            <div>
                <label>Image URL:</label>
                <input type="text" name="bildUrl" value={product.bildUrl} onChange={handleChange} />
            </div>
            <div>
                <label>Status:</label>
                <input type="text" name="status" value={product.status} onChange={handleChange} required />
            </div>
            <div>
                <label>Dimensions:</label>
                <input type="text" name="dimensioner" value={product.dimensioner} onChange={handleChange} />
            </div>
            <div>
                <label>Color:</label>
                <input type="text" name="färg" value={product.färg} onChange={handleChange} required />
            </div>
            <div>
                <label>Material:</label>
                <input type="text" name="material" value={product.material} onChange={handleChange} required />
            </div>
            <div>
                <label>Rating:</label>
                <input type="number" name="betyg" value={product.betyg} onChange={handleChange} />
            </div>
            <div>
                <label>Country of Manufacture:</label>
                <input type="text" name="tillverkningsland" value={product.tillverkningsland} onChange={handleChange} required />
            </div>
            <div>
                <label>Supplier ID:</label>
                <input type="number" name="supplierId" value={product.supplierId} onChange={handleChange} required />
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
