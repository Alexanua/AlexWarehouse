import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSupplierById, updateSupplier, createSupplier } from '../service/supplierService';

const SupplierComponent = ({ isNew }) => {
    const [supplier, setSupplier] = useState({
        companyName: '',
        contactDetails: '',
        email: '',
        phoneNumber: ''
    });
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isNew && id) {
            getSupplierById(id)
                .then(data => setSupplier(data))
                .catch(err => setError('Failed to fetch supplier details. Please try again.'));
        }
    }, [id, isNew]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!supplier.companyName || !supplier.contactDetails || !supplier.email || !supplier.phoneNumber) {
            setError('All fields are required. Please fill out all fields.');
            return;
        }
        try {
            const response = isNew ? await createSupplier(supplier) : await updateSupplier(id, supplier);
            console.log(`${isNew ? 'Added' : 'Updated'} Supplier:`, response);
            navigate('/suppliers');
        } catch (error) {
            console.error('Error with supplier operation:', error);
            setError(error.response?.data?.message || 'An unexpected error occurred during the operation.');
        }
    };

    return (
        <div className="container">
            <h2>{isNew ? 'Add' : 'Update'} Supplier</h2>
            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="companyName" value={supplier.companyName} onChange={handleChange} placeholder="Company Name" required />
                <input type="text" name="contactDetails" value={supplier.contactDetails} onChange={handleChange} placeholder="Contact Details" required />
                <input type="email" name="email" value={supplier.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="phoneNumber" value={supplier.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
                <button type="submit">{isNew ? 'Add' : 'Update'} Supplier</button>
            </form>
        </div>
    );
};

export default SupplierComponent;
