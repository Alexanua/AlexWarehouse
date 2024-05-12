import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/produkter';

// Funktion för att hämta alla produkter
export const listProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllProdukter`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products', error);
        throw error;
    }
};

// Funktion för att hämta en produkt efter ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getProduktById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch product', error);
        throw error;
    }
};

// Funktion för att skapa en ny produkt
export const createProduct = async (product) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/createProdukt`, product);
        return response.data;
    } catch (error) {
        console.error('Failed to create product', error);
        throw error;
    }
};

// Funktion för att uppdatera en befintlig produkt efter ID
export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateProdukt/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Failed to update product', error);
        if (error.response) {
            alert(`Server error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            alert('No response received');
        } else {
            alert(`Error setting up the request: ${error.message}`);
        }
        throw error;
    }
};

// Funktion för att ta bort en produkt efter ID
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/deleteProdukt/${id}`);
        return response.status;
    } catch (error) {
        console.error('Failed to delete product', error);
        throw error;
    }
};
