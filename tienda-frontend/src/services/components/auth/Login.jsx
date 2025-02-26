import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography, Alert } from '@mui/material';
import authService from '../../../services/authService';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Intentando login con:', { username });
            const response = await authService.login(username, password);
            console.log('Respuesta login:', response);
            setUser(response);
            navigate('/videojuegos');
        } catch (err) {
            console.error('Error en login:', err);
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Iniciar Sesión
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Iniciar Sesión
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;