import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Container, Typography, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import categoriaService from '../../../services/categoriaService';
import { useAuth } from '../../../context/AuthContext';

const CategoriaList = () => {
    const [categorias, setCategorias] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentCategoria, setCurrentCategoria] = useState({
        nombre: '',
        descripcion: ''
    });
    const [isEdit, setIsEdit] = useState(false);
    const { user, isAdmin } = useAuth();

    useEffect(() => {
        loadCategorias();
    }, []);

    const loadCategorias = async () => {
        try {
            const response = await categoriaService.getAll();
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al cargar categorías:', error);
        }
    };

    const handleOpen = (categoria = null) => {
        if (categoria) {
            setCurrentCategoria(categoria);
            setIsEdit(true);
        } else {
            setCurrentCategoria({ nombre: '', descripcion: '' });
            setIsEdit(false);
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await categoriaService.update(currentCategoria.id, currentCategoria);
            } else {
                await categoriaService.create(currentCategoria);
            }
            handleClose();
            loadCategorias();
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            try {
                await categoriaService.delete(id);
                loadCategorias();
            } catch (error) {
                console.error('Error al eliminar:', error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 4 }}>
                Categorías
                {isAdmin && (
                    <Button 
                        variant="contained" 
                        sx={{ float: 'right' }}
                        onClick={() => handleOpen()}
                    >
                        Nueva Categoría
                    </Button>
                )}
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            {isAdmin && <TableCell>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias.map((categoria) => (
                            <TableRow key={categoria.id}>
                                <TableCell>{categoria.nombre}</TableCell>
                                <TableCell>{categoria.descripcion}</TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <IconButton onClick={() => handleOpen(categoria)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(categoria.id)}>
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
                    {isEdit ? 'Editar Categoría' : 'Nueva Categoría'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nombre"
                        value={currentCategoria.nombre}
                        onChange={(e) => setCurrentCategoria({
                            ...currentCategoria,
                            nombre: e.target.value
                        })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Descripción"
                        multiline
                        rows={4}
                        value={currentCategoria.descripcion}
                        onChange={(e) => setCurrentCategoria({
                            ...currentCategoria,
                            descripcion: e.target.value
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

export default CategoriaList;