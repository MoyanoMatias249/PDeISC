// frontend/src/pages/Edicion.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../components/Formulario';
import '../styles/formulario.css';
import '../styles/edicion.css'

function Edicion({ usuarioEditar, actualizarUsuario, setUsuarioEditar, setMensaje }) {
    const navigate = useNavigate();

    return (
        <div className='edicion'>
            <div className='edicion-titulo'>
                <h2>Editar Usuario</h2>
                <button onClick={() => navigate('/')}> Volver al inicio</button>
            </div>
            <Formulario
                modo="editar"
                actualizarUsuario={actualizarUsuario}
                usuarioEditar={usuarioEditar}
                setUsuarioEditar={setUsuarioEditar}
                setMensaje={setMensaje}
            />
        </div>
    );
}

export default Edicion;
