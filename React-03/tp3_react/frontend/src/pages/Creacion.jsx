// frontend/src/pages/Creacion.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../components/Formulario';
import '../styles/formulario.css';
import '../styles/creacion.css'

function Creacion({ crearUsuario, setMensaje }) {
    const navigate = useNavigate();

    return (
        <div className="creacion">
            <div className="creacion-titulo">
                <h2>Crear Usuario</h2>
                <button onClick={() => navigate('/')}> Volver al inicio</button>
            </div>
            
            <Formulario 
                modo="crear" 
                crearUsuario={crearUsuario} 
                setMensaje={setMensaje} 
            />
            
        </div>
    );
}

export default Creacion;
