// Capturamos el formulario y donde mostrar usuarios
const form = document.getElementById('formulario');
const usuariosUl = document.getElementById('usuarios-ul');

// Función para cargar usuarios desde el servidor
function cargarUsuarios() {
    fetch('/personas') // Pedimos la lista de usuarios
        .then(res => res.text())
        .then(html => {
            console.log('Lista actualizada');
            usuariosUl.innerHTML = html; 
        });
}

// Evento al presionar el boton submit
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recargar la página

    const formData = new FormData(form); // Preparamos datos del form
    const params = new URLSearchParams(formData);

    // Enviamos los datos al servidor con fetch
    fetch('/enviar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
    })
    
    .then(() => {
        console.log('Usuario enviado');
        cargarUsuarios(); // Recargamos la lista de usuarios
        form.reset(); // Limpiamos el formulario
    });
});

// Cargamos la lista de usuarios al abrir la página
cargarUsuarios();