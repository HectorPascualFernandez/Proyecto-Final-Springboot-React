import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Container, Typography, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ventaService from '../../../services/ventaService';
import { useAuth } from '../../../context/AuthContext';

const VentaList = () => {
    const [ventas, setVentas] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentVenta, setCurrentVenta] = useState({
        videojuego_id: '',
        cantidad: '',
        precio_total: '',
        nombre_cliente: ''
    });
    const [isEdit, setIsEdit] = useState(false);
    const { user, isAdmin } = useAuth();

    useEffect(() => {
        loadVentas();
    }, []);

    const loadVentas = async () => {
        try {
            const response = await ventaService.getAll();
            setVentas(response.data);
        } catch (error) {
            console.error('Error al cargar ventas:', error);
        }
    };

    const handleOpen = (venta = null) => {
        if (venta) {
            setCurrentVenta(venta);
            setIsEdit(true);
        } else {
            setCurrentVenta({
                videojuego_id: '',
                cantidad: '',
                precio_total: '',
                nombre_cliente: ''
            });
            setIsEdit(false);
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await ventaService.update(currentVenta.id, currentVenta);
            } else {
                await ventaService.create(currentVenta);
            }
            handleClose();
            loadVentas();
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta venta?')) {
            try {
                await ventaService.delete(id);
                loadVentas();
            } catch (error) {
                console.error('Error al eliminar:', error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 4 }}>
                Ventas
                {isAdmin && (
                    <Button 
                        variant="contained" 
                        sx={{ float: 'right' }}
                        onClick={() => handleOpen()}
                    >
                        Nueva Venta
                    </Button>
                )}
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Videojuego</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Precio Total</TableCell>
                            <TableCell>Fecha</TableCell>
                            {isAdmin && <TableCell>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventas.map((venta) => (
                            <TableRow key={venta.id}>
                                <TableCell>{venta.videojuego?.titulo}</TableCell>
                                <TableCell>{venta.nombre_cliente}</TableCell>
                                <TableCell>{venta.cantidad}</TableCell>
                                <TableCell>{venta.precio_total}€</TableCell>
                                <TableCell>
                                    {new Date(venta.fecha_venta).toLocaleDateString()}
                                </TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <IconButton onClick={() => handleOpen(venta)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(venta.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {isEdit ? 'Editar Venta' : 'Nueva Venta'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="ID Videojuego"
                        type="number"
                        value={currentVenta.videojuego_id}
                        onChange={(e) => setCurrentVenta({
                            ...currentVenta,
                            videojuego_id: Number(e.target.value)
                        })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Cantidad"
                        type="number"
                        value={currentVenta.cantidad}
                        onChange={(e) => setCurrentVenta({
                            ...currentVenta,
                            cantidad: Number(e.target.value)
                        })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Precio Total"
                        type="number"
                        value={currentVenta.precio_total}
                        onChange={(e) => setCurrentVenta({
                            ...currentVenta,
                            precio_total: Number(e.target.value)
                        })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nombre del Cliente"
                        value={currentVenta.nombre_cliente}
                        onChange={(e) => setCurrentVenta({
                            ...currentVenta,
                            nombre_cliente: e.target.value
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

export default VentaList;