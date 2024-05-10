import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListSupplierComponent = () => {
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:8081/api/suppliers';

    useEffect(() => {
        axios.get(`${API_BASE_URL}/getAllSuppliers`)
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                console.error('Error fetching suppliers:', error);
            });
    }, []);

    return (
        <div>
            <h2>List of Suppliers</h2>
            <button onClick={() => navigate('/add-supplier')}>Add Supplier</button>
            <table>
                <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Contact Details</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {suppliers.map(supplier => (
                    <tr key={supplier.id}>
                        <td>{supplier.companyName}</td>
                        <td>{supplier.contactDetails}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.phoneNumber}</td>
                        <td>
                            <button onClick={() => navigate(`/update-supplier/${supplier.id}`)}>Update</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListSupplierComponent;
