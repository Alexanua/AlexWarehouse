import axios from 'axios';

// تعريف API_BASE_URL باستخدام Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/suppliers';

export const getAllSuppliers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllSuppliers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
};

export const getSupplierById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getSupplierById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch supplier by ID:', error);
        throw error;
    }
};

export const createSupplier = async (supplierData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addSupplier`, supplierData);
        return response.data;
    } catch (error) {
        console.error('There was an error adding the supplier:', error);
        throw error;
    }
};

export const updateSupplier = async (id, supplierData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateSupplier/${id}`, supplierData);
        return response.data;
    } catch (error) {
        console.error('Failed to update supplier:', error);
        throw error;
    }
};
