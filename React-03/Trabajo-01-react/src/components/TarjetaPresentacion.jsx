import "../App.css"
import imagenTarjeta from "../assets/imagen-tarjeta.png";

function TarjetaPresentacion() {
  const nombre = "Matias";
  const apellido = "Moyano";
  const profesion = "Informatico";

  return (
    <div className="tarjeta">
      <img src={imagenTarjeta} alt="Imagen Tarjeta" />
      <p>Nombre: {nombre}</p>
      <p>Apellido: {apellido}</p>
      <p>Profesion: {profesion}</p>
    </div>
  );
}

export default TarjetaPresentacion;
