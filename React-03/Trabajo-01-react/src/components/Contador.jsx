import "../App.css"
import { useState } from "react"

function Contador() {
    const [puntos, setPuntos] = useState(0);

    const aumentar = () => {
        setPuntos(puntos + 1);
    };

    const decrecer = () => {
        setPuntos(puntos - 1);
    };

    return (<>
        <div className="contenedor-puntos">
            <p>puntos: {puntos}</p>
            <div>
                <button onClick={aumentar}> Aumentar puntos </button>
                <button onClick={decrecer}> Decrecer puntos </button>
            </div>
        </div>
    </>)
}

export default Contador;