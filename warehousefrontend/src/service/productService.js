import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/produkter';

export const listProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllProdukter`);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Failed to fetch products', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getProduktById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch product', error);
        throw error;
    }
};

export const createProduct = async (product) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/createProdukt`, product);
        return response.data;
    } catch (error) {
        console.error('Failed to create product', error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateProdukt/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Failed to update product', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/deleteProdukt/${id}`);
        return response.status;
    } catch (error) {
        console.error('Failed to delete product', error);
        throw error;
    }
};
