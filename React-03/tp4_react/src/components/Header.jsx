import { Link } from 'react-router-dom';
import '../styles/styles.css';

function Header() {
  return (
    <header className="header">
      <h1>Mi Portfolio</h1>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/skills">Habilidades</Link>
        <Link to="/projects">Proyectos</Link>
        <Link to="/contact">Contacto</Link>
      </nav>
    </header>
  );
}

export default Header;
