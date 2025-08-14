import "../App.css"
import { useState } from "react";

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [enviado, setEnviado] = useState(false);

  const EnviarMensaje = (e) => {
    e.preventDefault();
    if (nombre.trim() !== "") {
      setEnviado(true);
    }
  };

  return (
    <>
    <div className="Formulario">
      <h3>Formulario</h3>
      
        <form onSubmit={EnviarMensaje}>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese su nombre"
            disabled={enviado}
          />

          <button type="submit" disabled={enviado} >Enviar</button>
        </form>
       {enviado && (
        <p>¡Bienvenido, {nombre}!</p>
      )}
      </div>
    </>
  );
}

export default Formulario;