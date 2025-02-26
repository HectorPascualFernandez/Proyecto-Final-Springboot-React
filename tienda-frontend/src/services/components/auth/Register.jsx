import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography, Alert } from '@mui/material';
import authService from '../../../services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validaciones básicas
            if (username.length < 4) {
                setError('El usuario debe tener al menos 4 caracteres');
                return;
            }
            if (password.length < 4) {
                setError('La contraseña debe tener al menos 4 caracteres');
                return;
            }

            await authService.register(username, password);
            navigate('/login');
        } catch (err) {
            console.error('Error detallado:', err);
            setError(err.response?.data?.message || 'Error al registrar usuario');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Registro
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={!!error && error.includes('usuario')}
                        helperText="Mínimo 4 caracteres"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error && error.includes('contraseña')}
                        helperText="Mínimo 4 caracteres"
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Registrarse
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Register;