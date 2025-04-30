//FUNCION MUESTRA EL COMPONENTE SELECCIONADO
function mostrarComponente(numero) {
    for (let i = 1; i <= 5; i++) {
        let comp = document.getElementById(`component-${i}`);
        comp.style.display = "none";
    }

    let componente = document.getElementById(`component-${numero}`);
    componente.style.display = "flex";
}