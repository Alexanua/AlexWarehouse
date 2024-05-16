import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaCheckCircle, FaPlus, FaEdit } from 'react-icons/fa';
import '../styles/ListProductComponent.css';

const ListProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:8081/produkter';

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getAllProdukter`);
            setProducts(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${API_BASE_URL}/deleteProdukt/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
                alert('Product deleted successfully');
            })
            .catch(error => console.error('Failed to delete product:', error));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="list-product-container">
            <h2>List of Products</h2>
            <button onClick={() => navigate('/add-product')} className="add-button">
                <FaPlus /> Add Product
            </button>
            <table>
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Weight</th>
                    <th>Expiration Date</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Color</th>
                    <th>Material</th>
                    <th>Warnings</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.length > 0 ? (
                    products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.namn}</td>
                            <td>{product.beskrivning}</td>
                            <td>${product.pris.toFixed(2)}</td>
                            <td>{product.kategori}</td>
                            <td>{product.vikt} kg</td>
                            <td>{product.utgångsdatum ? new Date(product.utgångsdatum).toLocaleDateString() : 'N/A'}</td>
                            <td>{product.lagerAntal}</td>
                            <td>{product.status}</td>
                            <td>{product.färg}</td>
                            <td>{product.material}</td>
                            <td>
                                {product.hasLowStock && (
                                    <span className="warning-icon" title={`Low stock: ${product.lagerAntal} units`}>
                                        <FaExclamationTriangle />
                                    </span>
                                )}
                                {product.hasExpired && (
                                    <span className="warning-icon" title={`Expired on: ${new Date(product.utgångsdatum).toLocaleDateString()}`}>
                                        <FaExclamationTriangle />
                                    </span>
                                )}
                                {product.expiresSoon && !product.hasExpired && (
                                    <span className="warning-icon" title={`Expires soon on: ${new Date(product.utgångsdatum).toLocaleDateString()}`}>
                                        <FaExclamationTriangle />
                                    </span>
                                )}
                                {!product.hasLowStock && !product.hasExpired && !product.expiresSoon && (
                                    <span className="good-icon" title="All good">
                                        <FaCheckCircle />
                                    </span>
                                )}
                            </td>
                            <td>
                                <Link to={`/edit-product/${product.id}`} className="edit-button">
                                    <FaEdit /> Edit
                                </Link>
                                <button onClick={() => handleDelete(product.id)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="13">No products available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ListProductComponent;
