// Inicialización de formularios
gestionarFormulario("form-frutas", "ingreso-fruta", "lista-frutas", 3, "fruta", "cantidad-frutas");
gestionarFormulario("form-amigos", "ingreso-amigo", "lista-amigos", 3, "amigo", "cantidad-amigos");
gestionarNumeros("form-numeros", "ingreso-numero", "lista-numeros", 0, "cantidad-numeros");


// Función para gestionar formularios (frutas, amigos)
function gestionarFormulario(formId, inputId, listaId, maxItems, tipo, cantidadId) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const mostrarLista = document.getElementById(listaId);
    const cantidad = document.getElementById(cantidadId);

    let arreglo = [];

    // Mostrar mensaje inicial
    cantidad.innerHTML = "Ingresa elemento";

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const valor = input.value.trim();

        if (valor === "") {
            return;
        }

        if (arreglo.length < maxItems) {
            arreglo.push(valor);
            renderizarLista(arreglo, mostrarLista);
            form.reset();
        }

        // Actualizar mensaje después de cada intento
        if (arreglo.length >= maxItems) {
            cantidad.innerHTML = "Máxima cantidad ingresada";
            cantidad.style.color = "red";
        } else {
            cantidad.innerHTML = "Ingresa elemento";
        }
    });
}


// Función para mostrar arrays como listas (<ul>)
function renderizarLista(array, contenedor) {
    contenedor.innerHTML = "<ul>" + array.map(item => `<li>${item}</li>`).join('') + "</ul>";
}

// Función específica para números (con validación especial)
function gestionarNumeros(formId, inputId, listaId, inicial = null, cantidadId) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const mostrarLista = document.getElementById(listaId);
    const cantidad = document.getElementById(cantidadId);

    let numeros = [];
    renderizarLista(numeros, mostrarLista);

    cantidad.innerHTML = "Ingresa número"; // mensaje inicial

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nuevoNumero = parseFloat(input.value);

        if (isNaN(nuevoNumero)) {
            return;
        }

        const ultimoNumero = numeros[numeros.length - 1] ?? -Infinity;

        if (nuevoNumero > ultimoNumero) {
            numeros.push(nuevoNumero);
            renderizarLista(numeros, mostrarLista);
        }

        form.reset();

        if (numeros.length === 0) {
            cantidad.innerHTML = "Ingresa número";
        } else {
            cantidad.innerHTML = `Cantidad de números: ${numeros.length}`;
        }
    });
}
