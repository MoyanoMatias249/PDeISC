import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = ({ tareas }) => {
  return (
    <div className='inicio'>
      <h1>Lista de Tareas</h1>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <Link to={`/detalles/${tarea.id}`}>
              <h3>{tarea.titulo}</h3>
              <p>{tarea.descripcion}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/crear">
        <button>Crear nueva tarea</button>
      </Link>
    </div>
  );
};

export default Inicio;
