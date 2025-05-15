// Capturamos el formulario, y donde mostrar productos
const form = document.getElementById('persona-form');
const lista = document.getElementById('persona-list');
const mensaje = document.getElementById('mensaje');

// Capturamos datos para verificar cantidad de hijos
const hijosSelect = document.getElementById('hijos');
const cantidadHijosLabel = document.getElementById('cantidadHijosLabel');

// Muestra u oculta el campo de cantidad de hijos basado en la selección
hijosSelect.addEventListener('change', () => {
    cantidadHijosLabel.style.display = (hijosSelect.value === 'Sí') ? 'block' : 'none';
});

// Enviar los datos del formulario al servidor
form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());

    // Validación para la cantidad de hijos
    if (datos.hijos === 'Sí' && (!datos.cantidadHijos || datos.cantidadHijos <= 0)) {
        mostrarMensaje('Debe indicar la cantidad de hijos', 'error');
        return;
    }

    // Enviar los datos al servidor mediante fetch (POST)
    fetch('/enviar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(datos).toString() 
    })
    .then(response => {
        if (response.ok) {
            mostrarMensaje('Persona guardada correctamente', 'success');
            form.reset();
            cantidadHijosLabel.style.display = 'none';
            actualizarLista(); 
        } else {
            mostrarMensaje('Error al guardar la persona', 'error');
        }
    })
    .catch(err => {
        console.error(err);
        mostrarMensaje('Error al conectar con el servidor', 'error');
    });
});

// Mostrar un mensaje en la interfaz
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.style.color = (tipo === 'success') ? 'lightgreen' : 'red';
    setTimeout(() => mensaje.textContent = '', 3000);
}

// Actualizar la lista de personas almacenadas
function actualizarLista() {
    fetch('/personas')
        .then(response => response.text())
        .then(data => {
            lista.innerHTML = data; 
        });
}

// Al cargar la página, actualiza la lista de personas
document.addEventListener('DOMContentLoaded', actualizarLista);
