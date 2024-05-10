import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/produkter/getAllProdukter');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/produkter/deleteProdukt/${id}`);
            fetchProducts(); // Refresh the list after deleting
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    return (
        <div>
            {editingProduct ? (
                <AddProduct product={editingProduct} refreshProducts={fetchProducts} />
            ) : (
                <div>
                    <h2>Products List</h2>
                    {products.map(product => (
                        <div key={product.id}>
                            {product.namn} - {product.pris} - {product.beskrivning}
                            <button onClick={() => handleEdit(product)}>Edit</button>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={() => setEditingProduct({})}>Add New Product</button>
                </div>
            )}
        </div>
    );
}

export default ProductList;
