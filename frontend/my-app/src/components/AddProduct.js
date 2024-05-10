import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProduct({ product, refreshProducts }) {
    // Initialize state with all fields
    const [formData, setFormData] = useState({
        namn: product ? product.namn : '',
        beskrivning: product ? product.beskrivning : '',
        pris: product ? product.pris : 0,
        lagerAntal: product ? product.lagerAntal : 0,
        kategori: product ? product.kategori : '',
        vikt: product ? product.vikt : 0,
        utgångsdatum: product ? product.utgångsdatum : '',
        bildUrl: product ? product.bildUrl : '',
        status: product ? product.status : '',
        dimensioner: product ? product.dimensioner : '',
        färg: product ? product.färg : '',
        material: product ? product.material : '',
        betyg: product ? product.betyg : 0,
        tillverkningsland: product ? product.tillverkningsland : ''
    });

    useEffect(() => {
        // Set form data whenever the product prop changes
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8081/produkter/createProdukt';
        try {
            await axios.post(url, formData);
            alert('Product saved successfully!');
            refreshProducts();
            // Reset form fields after successful submission
            setFormData({
                namn: '', beskrivning: '', pris: 0, lagerAntal: 0, kategori: '',
                vikt: 0, utgångsdatum: '', bildUrl: '', status: '', dimensioner: '',
                färg: '', material: '', betyg: 0, tillverkningsland: ''
            });
        } catch (error) {
            alert(`Failed to save product: ${error.message}`);
            console.error(error);
        }
    };

    return (
        <div>
            <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Add input fields for each property */}
                <input type="text" name="namn" value={formData.namn} onChange={handleChange} placeholder="Name" required />
                {/* Repeat the above line for each field, changing 'name', 'value', and 'placeholder' appropriately */}
                <button type="submit">Save Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
