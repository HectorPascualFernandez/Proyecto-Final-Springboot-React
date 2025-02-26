import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const authService = {
    register: async (username, password) => {
        try {
            console.log('Datos de registro:', { username, password });
            const response = await axios.post(`${API_URL}/users/register`, {
                username: username,
                password: password,
                admin: false,
                enabled: true
            });
            console.log('Respuesta del servidor:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error completo:', error.response?.data || error);
            throw new Error('Error en el registro');
        }
    },
    
    login: async (username, password) => {
        try {
            console.log('Enviando petición a:', `${API_URL}/login`);
            console.log('Con datos:', { username, password });
            
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Respuesta del servidor:', response.data);

            if (response.data.token) {
                const userData = {
                    username: response.data.username,
                    token: response.data.token
                };
                localStorage.setItem('user', JSON.stringify(userData));
                return userData;
            } else {
                throw new Error('No se recibió token');
            }
        } catch (error) {
            console.error('Error en login:', error);
            if (error.response) {
                console.error('Respuesta del servidor:', error.response.data);
                throw new Error(error.response.data.message || 'Error en la autenticación');
            }
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default authService;