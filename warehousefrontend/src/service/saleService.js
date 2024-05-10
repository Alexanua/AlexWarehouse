// src/service/saleService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/sales';

// Hämta alla försäljningar
export const listSales = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllSales`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch sales:', error);
        throw error;
    }
};

// Hämta en försäljning via ID
export const getSaleById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch sale with ID: ${id}`, error);
        throw error;
    }
};

// Skapa en ny försäljning
export const createSale = async (saleData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/createSale`, saleData);
        return response.data;
    } catch (error) {
        console.error('Failed to create sale:', error);
        throw error;
    }
};

// Radera en försäljning via ID
export const deleteSale = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error(`Failed to delete sale with ID: ${id}`, error);
        throw error;
    }
};
