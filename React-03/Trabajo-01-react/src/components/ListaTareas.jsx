import "../App.css";
import { useState } from "react";

function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") return;
    setTareas([...tareas, { texto: nuevaTarea, completada: false }]);
    setNuevaTarea("");
  };

  const toggleCompletada = (index) => {
    const tareasActualizadas = tareas.map((tarea, i) =>
      i === index ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(tareasActualizadas);
  };

  return (<>
    <div className="lista-tareas">
      <h3>Lista de Tareas</h3>
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={agregarTarea}>Agregar</button>

      <ul>
        {tareas.map((tarea, index) => (
          <li
            key={index}
            onClick={() => toggleCompletada(index)}
            style={{
              textDecoration: tarea.completada ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {tarea.texto}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default ListaTareas;