import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/alerts';

const fetchAlerts = () => {
    return axios.get(`${API_BASE_URL}/getAllAlerts`);
};

const markAsRead = (id) => {
    return axios.put(`${API_BASE_URL}/markAsRead/${id}`);
};

const clearAlerts = () => {
    return axios.delete(`${API_BASE_URL}/clearAlerts`);
};

export default {
    fetchAlerts,
    markAsRead,
    clearAlerts,
};
