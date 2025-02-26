import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

const videojuegoService = {
    getAll: async () => {
        return await axios.get(`${API_URL}/videojuegos`, { headers: getAuthHeader() });
    },

    getById: async (id) => {
        return await axios.get(`${API_URL}/videojuegos/${id}`, { headers: getAuthHeader() });
    },

    create: async (videojuego) => {
        return await axios.post(`${API_URL}/videojuegos`, videojuego, { headers: getAuthHeader() });
    },

    update: async (id, videojuego) => {
        return await axios.put(`${API_URL}/videojuegos/${id}`, videojuego, { headers: getAuthHeader() });
    },

    delete: async (id) => {
        return await axios.delete(`${API_URL}/videojuegos/${id}`, { headers: getAuthHeader() });
    }
};

export default videojuegoService;