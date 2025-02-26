import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

const ventaService = {
    getAll: async () => {
        return await axios.get(`${API_URL}/ventas`, { headers: getAuthHeader() });
    },

    getById: async (id) => {
        return await axios.get(`${API_URL}/ventas/${id}`, { headers: getAuthHeader() });
    },

    create: async (venta) => {
        return await axios.post(`${API_URL}/ventas`, venta, { headers: getAuthHeader() });
    },

    update: async (id, venta) => {
        return await axios.put(`${API_URL}/ventas/${id}`, venta, { headers: getAuthHeader() });
    },

    delete: async (id) => {
        return await axios.delete(`${API_URL}/ventas/${id}`, { headers: getAuthHeader() });
    }
};

export default ventaService;