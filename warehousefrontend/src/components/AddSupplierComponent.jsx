import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddSupplierComponent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:8081/api/suppliers';

    const onSubmit = supplier => {
        axios.post(`${API_BASE_URL}/addSupplier`, supplier)
            .then(() => {
                navigate('/suppliers');
            })
            .catch(error => {
                console.error('Failed to add supplier:', error);
                alert('Failed to add supplier: ' + error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Company Name</label>
            <input {...register('companyName', { required: true })} />
            {errors.companyName && <p>This field is required.</p>}

            <label>Contact Details</label>
            <input {...register('contactDetails', { required: true })} />
            {errors.contactDetails && <p>This field is required.</p>}

            <label>Email</label>
            <input {...register('email', { required: true })} />
            {errors.email && <p>This field is required.</p>}

            <label>Phone Number</label>
            <input {...register('phoneNumber', { required: true })} />
            {errors.phoneNumber && <p>This field is required.</p>}

            <button type="submit">Add Supplier</button>
        </form>
    );
};

export default AddSupplierComponent;
