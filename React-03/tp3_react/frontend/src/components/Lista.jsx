//frontend/src/components/Lista.jsx
import React from 'react';

function Lista({ usuarios, eliminarUsuario, setUsuarioEditar }) {
  const atributos = [
    'Nombre',
    'Apellido',
    'Dirección',
    'Teléfono',
    'Celular',
    'Nacimiento',
    'Email',
    'Acciones'
  ];
  return (
    <div className="tabla-transpuesta">
      {usuarios.length === 0 ? (
        <p>No hay usuarios.</p>
      ) : (
        <div className="tabla-scroll">
          <div className="columna-atributos">
            {atributos.map((atributo, index) => (
              <div key={index} className="celda atributo">{atributo}</div>
            ))}
          </div>
          <div className="contenedor-usuarios">
            {usuarios.map((usuario) => (
               <div key={usuario.id} className="columna-usuario">
                <div  className="celda">{usuario.nombre}</div>
                <div  className="celda">{usuario.apellido}</div>
                <div  className="celda">{usuario.direccion}</div>
                <div  className="celda">{usuario.telefono}</div>
                <div  className="celda">{usuario.celular}</div>
                <div  className="celda">{usuario.fecha_nacimiento?.split('T')[0]}</div>
                <div  className="celda">{usuario.email}</div>
                <div  className="celda acciones">
                  <button onClick={() => setUsuarioEditar(usuario)}>Editar</button>
                  <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                  </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Lista;
