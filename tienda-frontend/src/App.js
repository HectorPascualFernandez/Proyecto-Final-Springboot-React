import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './component/common/Navbar';
import Login from './services/components/auth/Login';
import Register from './services/components/auth/Register';
import VideojuegoList from './services/components/videojuegos/VideojuegoList';
import CategoriaList from './services/components/categorias/CategoriaList';
import VentaList from './services/components/ventas/VentaList';

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

function AppContent() {
    const { user } = useAuth();

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/login" element={
                    !user ? <Login /> : <Navigate to="/videojuegos" />
                } />
                <Route path="/register" element={
                    !user ? <Register /> : <Navigate to="/videojuegos" />
                } />
                <Route path="/videojuegos" element={
                    user ? <VideojuegoList /> : <Navigate to="/login" />
                } />
                <Route path="/categorias" element={
                    user ? <CategoriaList /> : <Navigate to="/login" />
                } />
                <Route path="/ventas" element={
                    user ? <VentaList /> : <Navigate to="/login" />
                } />
                <Route path="/" element={
                    user ? <Navigate to="/videojuegos" /> : <Navigate to="/login" />
                } />
            </Routes>
        </div>
    );
}

export default App;