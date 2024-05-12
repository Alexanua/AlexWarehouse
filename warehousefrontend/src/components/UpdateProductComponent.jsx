import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/UpdateProductComponent.css';
import { getProductById, updateProduct } from '../service/productService'; // Importera funktionerna från productService

const UpdateProductComponent = () => {
    const { productId } = useParams(); // This matches the route parameter
    const navigate = useNavigate(); // Navigation hook for redirection

    // Initialize the product state with default values
    const [product, setProduct] = useState({
        namn: '',
        beskrivning: '',
        pris: 0,
        lagerAntal: 0,
        kategori: '',
        vikt: 0,
        utgångsdatum: '',
        bildUrl: '',
        status: '',
        dimensioner: '',
        färg: '',
        material: '',
        betyg: 0,
        tillverkningsland: '',
        supplierId: 0
    });

    // Fetch the product details when the component mounts or productId changes
    useEffect(() => {
        console.log("Product ID:", productId);  // Log product ID for verification
        if (productId) {
            getProductById(productId)
                .then(data => {
                    setProduct(data); // Set the product state with data from the response
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                    alert('Could not fetch product details.');
                });
        } else {
            console.log("No product ID found.");  // Log if no product ID is found
        }
    }, [productId]);

    // Handle input changes for each form field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission to update the product
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productId) {
            alert('Product ID is missing. Cannot update the product.');
            return;
        }
        try {
            await updateProduct(productId, product);
            alert('Product updated successfully');
            navigate('/products'); // Redirect to the products page after successful update
        } catch (error) {
            console.error('Failed to update product:', error);
            alert('Failed to update product');
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
