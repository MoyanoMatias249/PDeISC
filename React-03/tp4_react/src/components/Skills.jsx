import { useState } from 'react';

const skillsList = ['HTML', 'CSS', 'JavaScript', 'PHP','Node.js', 'React', ];

function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section id="skills">
      <h3>Mis habilidades</h3>
      <ul>
        {skillsList.map((skill, index) => (
          <li
            key={index}
            onClick={() => setSelectedSkill(skill)}
            style={{ cursor: 'pointer', fontWeight: selectedSkill === skill ? 'bold' : 'normal' }}
          >
            {skill}
          </li>
        ))}
      </ul>
      {selectedSkill && <p>Has seleccionado: {selectedSkill}</p>}
    </section>
  );
}

export default Skills;
