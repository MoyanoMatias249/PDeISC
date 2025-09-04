import { useState } from 'react';

const projectData = [
  { title: 'Portfolio', description: 'Mi portfolio personal hecho con React.' },
  { title: 'Lista de componentes', description: 'Pagina donde se muestran varios componentes creados, cada uno con un' },
  { title: 'Lista de Tareas', description: 'Pagina para crear tareas, marcarlas como completadas y borrarlas' },
  { title: 'Lista de usuarios', description: 'Pagina para mostrar usuarios, editarlos, borrarlos y crear nuevos' }
];

function Projects() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects">
      <h3>Proyectos</h3>
      {projectData.slice(0, showAll ? projectData.length : 1).map((project, index) => (
        <div key={index}>
          <h4>{project.title}</h4>
          <p>{project.description}</p>
        </div>
      ))}
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Ver menos' : 'Ver más'}
      </button>
    </section>
  );
}

export default Projects;
