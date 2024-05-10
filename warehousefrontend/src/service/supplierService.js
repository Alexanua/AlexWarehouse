import axios from 'axios';

// تعريف API_BASE_URL باستخدام Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/suppliers';

export const getAllSuppliers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllSuppliers`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        return { success: false, error: error.message || "Failed to fetch suppliers" };
    }
};

export const getSupplierById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getSupplierById/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Failed to fetch supplier by ID:', error);
        return { success: false, error: error.message || "Supplier not found" };
    }
};

export const createSupplier = async (supplierData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addSupplier`, supplierData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('There was an error adding the supplier:', error);
        return { success: false, error: error.message || "Failed to add supplier" };
    }
};

export const updateSupplier = async (id, supplierData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateSupplier/${id}`, supplierData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Failed to update supplier:', error);
        return { success: false, error: error.message || "Failed to update supplier" };
    }
};



export const listSuppliers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllSuppliers`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        return { success: false, error: error.message || "Failed to list suppliers" };
    }
};
