//frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Lista from './components/Lista';

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
    if (!window.confirm('¿Eliminar usuario?')) return;
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
      <Formulario
        crearUsuario={crearUsuario}
        actualizarUsuario={actualizarUsuario}
        usuarioEditar={usuarioEditar}
        setUsuarioEditar={setUsuarioEditar}
        setMensaje={setMensaje}
      />
      <Lista
        usuarios={usuarios}
        eliminarUsuario={eliminarUsuario}
        setUsuarioEditar={setUsuarioEditar}
      />
      {mensaje && <p style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</p>}
    </>
  );
}

export default App;
