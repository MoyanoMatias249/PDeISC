const formId = document.getElementById("form");
const dato1 = document.getElementById("input-id");
const dato2 = document.getElementById("input-nombre");
const dato3 = document.getElementById("input-jaula");
const dato4 = document.getElementById("input-tipo");
const dato5 = document.getElementById("input-peso");
const resultadosDiv = document.getElementById("resultados")

let animales = []

resultadosDiv.innerHTML = "Esperando el ingreso de un animal..."

formId.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const objetoAnimal = new Zoologico(dato1.value, dato2.value, dato3.value, dato4.value, dato5.value)

    animales.push(objetoAnimal);

    formId.reset();
    
    const jaula5Livianos = animales.filter(a => a.jaulaNumero === 5 && a.peso < 3).length;
    const felinosEntreJaulas = animales.filter(a => a.idTipoAnimal === 1 && a.jaulaNumero >= 2 && a.jaulaNumero <= 5).length;
    const animalLigeroJaula4 = animales.find(a => a.jaulaNumero === 4 && a.peso < 120);
    const nombreAnimalJaula4 = animalLigeroJaula4 ? animalLigeroJaula4.nombre : "No encontrado";

    let tabla = `
        <p>Cantidad de animales en jaula 5 con peso < 3kg: ${jaula5Livianos}</p>
        <p>Cantidad de felinos entre jaulas 2 y 5: ${felinosEntreJaulas}</p>
        <p>Nombre del animal en la jaula 4 con peso < 120kg: ${nombreAnimalJaula4}</p>
            <h2>Tabla de Animales</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Jaula</th>
                        <th>Tipo</th>
                        <th>Peso</th>
                    </tr>
                </thead>
                <tbody>
        `;
    animales.forEach(a => {
        tabla += `
            <tr>
                <td>${a.idAnimal}</td>
                <td>${a.nombre}</td>
                <td>${a.jaulaNumero}</td>
                <td>${a.idTipoAnimal}</td>
                <td>${a.peso}</td>
            </tr>
        `;
    });

    tabla += `</tbody></table>`;
    resultadosDiv.innerHTML = tabla;
});
