// Capturamos el formulario y donde mostrar productos
const form = document.getElementById('producto-form');
const productosUl = document.getElementById('productos-ul');

// Función para cargar productos desde el servidor
function cargarProductos() {
    // Pedimos la lista de productos
    fetch('/productos')
        .then(res => res.text())
        .then(html => {
            productosUl.innerHTML = html;
        });
}

// Evento al presionar el boton submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const params = new URLSearchParams(formData);

    // Enviamos los datos al servidor con fetch
    fetch('/agregar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
    })
    .then(() => {
        cargarProductos();
        form.reset();
    });
});

// Cargamos la lista de productos al abrir la página
cargarProductos();
