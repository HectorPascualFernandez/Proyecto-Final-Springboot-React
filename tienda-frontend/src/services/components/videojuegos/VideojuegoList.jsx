import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Container, Typography, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import videojuegoService from '../../../services/videojuegoService';
import { useAuth } from '../../../context/AuthContext';

const VideojuegoList = () => {
    const [videojuegos, setVideojuegos] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentVideojuego, setCurrentVideojuego] = useState({
        titulo: '',
        precio: '',
        stock: '',
        categoria_id: ''
    });
    const [isEdit, setIsEdit] = useState(false);
    const { user, isAdmin } = useAuth();

    useEffect(() => {
        loadVideojuegos();
    }, []);

    const loadVideojuegos = async () => {
        try {
            const response = await videojuegoService.getAll();
            setVideojuegos(response.data);
        } catch (error) {
            console.error('Error al cargar videojuegos:', error);
        }
    };

    const handleOpen = (videojuego = null) => {
        if (videojuego) {
            setCurrentVideojuego(videojuego);
            setIsEdit(true);
        } else {
            setCurrentVideojuego({
                titulo: '',
                precio: '',
                stock: '',
                categoria_id: ''
            });
            setIsEdit(false);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await videojuegoService.update(currentVideojuego.id, currentVideojuego);
            } else {
                await videojuegoService.create(currentVideojuego);
            }
            handleClose();
            loadVideojuegos();
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este videojuego?')) {
            try {
                await videojuegoService.delete(id);
                loadVideojuegos();
            } catch (error) {
                console.error('Error al eliminar:', error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 4 }}>
                Videojuegos
                {isAdmin && (
                    <Button 
                        variant="contained" 
                        sx={{ float: 'right' }}
                        onClick={() => handleOpen()}
                    >
                        Nuevo Videojuego
                    </Button>
                )}
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Categoría</TableCell>
                            {isAdmin && <TableCell>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {videojuegos.map((videojuego) => (
                            <TableRow key={videojuego.id}>
                                <TableCell>{videojuego.titulo}</TableCell>
                                <TableCell>{videojuego.precio}€</TableCell>
                                <TableCell>{videojuego.stock}</TableCell>
                                <TableCell>{videojuego.categoria?.nombre}</TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <IconButton onClick={() => handleOpen(videojuego)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(videojuego.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {isEdit ? 'Editar Videojuego' : 'Nuevo Videojuego'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Título"
                        value={currentVideojuego.titulo}
                        onChange={(e) => setCurrentVideojuego({
                            ...currentVideojuego,
                            titulo: e.target.value
                        })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Precio"
                        type="number"
                        value={currentVideojuego.precio}
                        onChange={(e) => setCurrentVideojuego({
                            ...currentVideojuego,
                            precio: Number(e.target.value)
                        })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Stock"
                        type="number"
                        value={currentVideojuego.stock}
                        onChange={(e) => setCurrentVideojuego({
                            ...currentVideojuego,
                            stock: Number(e.target.value)
                        })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="ID Categoría"
                        type="number"
                        value={currentVideojuego.categoria_id}
                        onChange={(e) => setCurrentVideojuego({
                            ...currentVideojuego,
                            categoria_id: Number(e.target.value)
                        })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {isEdit ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default VideojuegoList;