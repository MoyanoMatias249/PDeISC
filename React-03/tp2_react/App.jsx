import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Detalles from './pages/Detalles';
import Creacion from './pages/Creacion';
import "./App.css"

const App = () => {
  const [tareas, setTareas] = useState([
    { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción de tarea 1', estado: false, fecha: '2025-08-21' },
  ]);

  const agregarTarea = (tarea) => {
    setTareas([...tareas, tarea]);
  };

  const actualizarTarea = (tareaActualizada) => {
    const nuevasTareas = tareas.map(t => 
      t.id === tareaActualizada.id ? tareaActualizada : t
    );
    setTareas(nuevasTareas);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio tareas={tareas} />} />
        <Route path="/detalles/:id" element={<Detalles tareas={tareas} actualizarTarea={actualizarTarea} />} />
        <Route path="/crear" element={<Creacion agregarTarea={agregarTarea} />} />
      </Routes>
    </Router>
  );
};

export default App;
  