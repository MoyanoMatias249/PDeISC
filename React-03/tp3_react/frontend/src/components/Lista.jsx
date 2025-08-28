//frontend/src/components/Lista.jsx
import React from 'react';
import '../styles/lista.css';

function Lista({ usuarios, eliminarUsuario, setUsuarioEditar }) {
  return (
    <div className="lista-usuarios">
      <h2>Usuarios</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Celular</th>
              <th>Fecha de Nacimiento</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.direccion}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.celular}</td>
                <td>{usuario.fecha_nacimiento?.split('T')[0]}</td>
                <td>{usuario.email}</td>
                <td>
                  <button onClick={() => setUsuarioEditar(usuario)}>Editar</button>
                  <button onClick={() => eliminarUsuario(usuario.id)} style={{ marginLeft: '5px' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Lista;
