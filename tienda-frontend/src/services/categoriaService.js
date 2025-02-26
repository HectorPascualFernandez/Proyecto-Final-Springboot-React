import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

const categoriaService = {
    getAll: async () => {
        return await axios.get(`${API_URL}/categorias`, { headers: getAuthHeader() });
    },

    getById: async (id) => {
        return await axios.get(`${API_URL}/categorias/${id}`, { headers: getAuthHeader() });
    },

    create: async (categoria) => {
        return await axios.post(`${API_URL}/categorias`, categoria, { headers: getAuthHeader() });
    },

    update: async (id, categoria) => {
        return await axios.put(`${API_URL}/categorias/${id}`, categoria, { headers: getAuthHeader() });
    },

    delete: async (id) => {
        return await axios.delete(`${API_URL}/categorias/${id}`, { headers: getAuthHeader() });
    }
};

export default categoriaService;