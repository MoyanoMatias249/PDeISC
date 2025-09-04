//frontend/src/pages/Inicio.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lista from '../components/Lista';
import '../styles/inicio.css'

function Inicio({ usuarios, eliminarUsuario, setUsuarioEditar, mensaje, setMensaje }) {
  const navigate = useNavigate();

  const handleEditar = (usuario) => {
    setUsuarioEditar(usuario);
    navigate(`/editar/${usuario.id}`);
  };

  return (
    <div className='inicio'>
      <div className="inicio-titulo">
        <h2>Usuarios</h2>
        <button onClick={() => navigate('/crear')}>
          Crear nuevo usuario
        </button>
      </div>
      <Lista
        usuarios={usuarios}
        eliminarUsuario={eliminarUsuario}
        setUsuarioEditar={handleEditar}
      />
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Inicio;
