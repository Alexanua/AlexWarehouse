
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, createProduct, updateProduct } from '../service/productService';

const ProductComponent = () => {
    const [product, setProduct] = useState({
        namn: '',
        beskrivning: '',
        pris: '',
        kategori: '',
        vikt: '',
        utgångsdatum: '',
        lagerAntal: '',
        status: '',
        färg: '',
        material: '',
        bildUrl: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);


    const fetchProduct = async (id) => {
        try {
            const data = await getProductById(id);
            setProduct(data);
        } catch (error) {
            console.error('Failed to fetch product', error);
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateProduct(id, product);
            } else {
                await createProduct(product);
            }
            navigate('/');
        } catch (error) {
            console.error('Failed to submit product', error);
        }
    };

    // Render a form with inputs for each property
    return (
        <div className="container">
            <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="namn" value={product.namn} onChange={handleChange} placeholder="Name" />
                </div>
                {/* Repeat this input structure for each field */}
                {/* ... */}
                <button type="submit">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export default ProductComponent;