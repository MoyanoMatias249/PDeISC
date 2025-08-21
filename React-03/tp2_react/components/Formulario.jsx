import React, { useState } from 'react';

const Formulario = ({ onSubmit }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaTarea = {
      id: Date.now(),
      titulo,
      descripcion,
      estado,
      fecha: new Date().toLocaleDateString(),
    };
    onSubmit(nuevaTarea);
    setTitulo('');
    setDescripcion('');
    setEstado(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Estado</label>
        <input
          type="checkbox"
          checked={estado}
          onChange={(e) => setEstado(e.target.checked)}
        />
        Completa
      </div>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default Formulario;
