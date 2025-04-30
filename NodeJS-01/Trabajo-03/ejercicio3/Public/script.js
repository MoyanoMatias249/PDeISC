//FUNCION MUESTRA EL COMPONENTE SELECCIONADO
function mostrarComponente(numero) {
    for (let i = 1; i <= 5; i++) {
        let comp = document.getElementById(`component-${i}`);
        comp.style.display = "none";
    }

    let componente = document.getElementById(`component-${numero}`);
    componente.style.display = "flex";
    
    // Contamos hijos
    let cantidadHijos = componente.querySelector('.container-box').children.length;

    // Mostramos el resultado en el div "resultado"
    const resultado = document.getElementById('resultado');
    resultado.textContent = `El componente ${numero} tiene ${cantidadHijos} hijo(s).`;

}
