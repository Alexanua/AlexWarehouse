import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Ensure to install PropTypes

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AddProduct({ product, refreshProducts }) {
    const [formData, setFormData] = useState({
        namn: product ? product.namn : '',
        beskrivning: product ? product.beskrivning : '',
        pris: product ? product.pris : 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (product) {
            setFormData({
                namn: product.namn,
                beskrivning: product.beskrivning,
                pris: product.pris
            });
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
        setIsLoading(true);
        const method = product ? 'put' : 'post';
        const url = product
            ? `${API_BASE_URL}/produkter/updateProdukt/${product.id}`
            : `${API_BASE_URL}/produkter/createProdukt`;

        try {
            await axios[method](url, formData);
            alert('Product saved successfully!');
            refreshProducts();
            if (!product) {
                setFormData({ namn: '', beskrivning: '', pris: 0 });
            }
        } catch (error) {
            setError('Failed to save product: ' + error.message);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="namn"
                    value={formData.namn}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="beskrivning"
                    value={formData.beskrivning}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    name="pris"
                    value={formData.pris}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {product ? 'Update' : 'Save'} Product
                </button>
            </form>
        </div>
    );
}

AddProduct.propTypes = {
    product: PropTypes.object,
    refreshProducts: PropTypes.func.isRequired
};

export default AddProduct;
