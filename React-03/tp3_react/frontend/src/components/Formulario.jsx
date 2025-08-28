//frontend/src/components/Formulario.jsx
import React, { useState, useEffect } from 'react';
import '../styles/formulario.css';

function Formulario({ crearUsuario, actualizarUsuario, usuarioEditar, setUsuarioEditar, setMensaje }) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    celular: '',
    fecha_nacimiento: '',
    email: ''
  });

  useEffect(() => {
    if (usuarioEditar) {
      setForm(usuarioEditar);
    } else {
      setForm({
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        celular: '',
        fecha_nacimiento: '',
        email: ''
      });
    }
  }, [usuarioEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuarioEditar) {
      await actualizarUsuario(usuarioEditar.id, form);
    } else {
      await crearUsuario(form);
    }

    setForm({
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      celular: '',
      fecha_nacimiento: '',
      email: ''
    });
  };

  const handleCancelar = () => {
    setUsuarioEditar(null);
    setMensaje('');
  };

  return (
    <div className="formulario">
      <h2>{usuarioEditar ? 'Editar Usuario' : 'Crear Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((campo) => (
          <div key={campo} className="campo">
            <label>{campo}:</label><br />
            <input
              type={campo === 'fecha_nacimiento' ? 'date' : 'text'}
              name={campo}
              value={form[campo] || ''}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">{usuarioEditar ? 'Actualizar' : 'Guardar'}</button>
        {usuarioEditar && (
          <button type="button" onClick={handleCancelar} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default Formulario;
