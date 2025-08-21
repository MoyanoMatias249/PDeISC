import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Detalles = ({ tareas, actualizarTarea }) => {
  const { id } = useParams();
  const tarea = tareas.find(t => t.id === parseInt(id));

  if (!tarea) return <div>Tarea no encontrada</div>;

  const handleCambioEstado = () => {
    const tareaActualizada = { ...tarea, estado: !tarea.estado };
    actualizarTarea(tareaActualizada);
  };

  return (
    <div className='detalles'>
      <h1>{tarea.titulo}</h1>
      <p>{tarea.descripcion}</p>
      <p>Fecha de creación: {tarea.fecha}</p>
      <p>Estado: {tarea.estado ? 'Completa' : 'Incompleta'}</p>

      <button onClick={handleCambioEstado}>
        Marcar como {tarea.estado ? 'Incompleta' : 'Completa'}
      </button>
      <Link to="/">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default Detalles;
