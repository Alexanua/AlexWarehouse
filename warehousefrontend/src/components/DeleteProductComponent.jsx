import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, deleteProduct } from '../service/productService';

const DeleteProductComponent = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getProductById(productId).then(data => {
            setProduct(data);
            setLoading(false);
        }).catch(err => {
            console.error('Failed to fetch product details', err);
            setError('Failed to fetch product details');
            setLoading(false);
        });
    }, [productId]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(productId).then(() => {
                alert("Product successfully deleted");
                navigate('/');
            }).catch(err => {
                console.error('Failed to delete product', err);
                alert("Failed to delete product");
            });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <h1>Delete Product</h1>
            <p>Are you sure you want to delete the product: {product.name}?</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
};

export default DeleteProductComponent;
