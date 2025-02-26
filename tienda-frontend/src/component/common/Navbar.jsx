import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
        window.location.reload(); // Forzar recarga para limpiar el estado
    };

    // Si no hay usuario, no mostrar la navbar
    if (!user) return null;

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Tienda de Videojuegos
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" onClick={() => navigate('/videojuegos')}>
                        VIDEOJUEGOS
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/categorias')}>
                        CATEGORÍAS
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/ventas')}>
                        VENTAS
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        CERRAR SESIÓN
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;