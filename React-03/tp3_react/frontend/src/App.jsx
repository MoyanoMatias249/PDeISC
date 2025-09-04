//frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Creacion from './pages/Creacion';
import Edicion from './pages/Edicion';
import './styles/variables.css'

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [mensaje, setMensaje] = useState('');

  // Carga usuarios
  const cargarUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:3001/usuarios');
      const data = await res.json();
      setUsuarios(data);
    } catch {
      setMensaje('Error al cargar usuarios');
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Crear usuario
  const crearUsuario = async (usuario) => {
    try {
      const res = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });
      if (res.ok) {
        setMensaje('Usuario creado');
        cargarUsuarios();
      } else {
        setMensaje('Error al crear usuario');
      }
    } catch {
      setMensaje('Error de conexión');
    }
  };

  // Actualizar usuario
  const actualizarUsuario = async (id, usuario) => {
    try {
      const res = await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });
      if (res.ok) {
        setMensaje('Usuario actualizado');
        setUsuarioEditar(null);
        cargarUsuarios();
      } else {
        setMensaje('Error al actualizar usuario');
      }
    } catch {
      setMensaje('Error de conexión');
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/usuarios/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMensaje('Usuario eliminado');
        cargarUsuarios();
      } else {
        setMensaje('Error al eliminar usuario');
      }
    } catch {
      setMensaje('Error de conexión');
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                usuarios={usuarios}
                eliminarUsuario={eliminarUsuario}
                setUsuarioEditar={setUsuarioEditar}
                mensaje={mensaje}
                setMensaje={setMensaje}
              />
            }
          />
          <Route
            path="/crear"
            element={
              <Creacion
                crearUsuario={crearUsuario}
                setMensaje={setMensaje}
              />
            }
          />
          <Route
            path="/editar/:id"
            element={
              <Edicion
                usuarios={usuarios}
                usuarioEditar={usuarioEditar}
                actualizarUsuario={actualizarUsuario}
                setUsuarioEditar={setUsuarioEditar}
                setMensaje={setMensaje}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
