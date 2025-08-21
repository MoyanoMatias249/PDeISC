import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Formulario from '../components/Formulario';

const Creacion = ({ agregarTarea }) => {
  const navigate = useNavigate();

  const handleSubmit = (tarea) => {
    agregarTarea(tarea);
    navigate('/');
  };

  return (
    <div className='creacion'>
      <h1>Crear nueva tarea</h1>
      <Formulario onSubmit={handleSubmit} />
    
      <Link to="/">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default Creacion;
