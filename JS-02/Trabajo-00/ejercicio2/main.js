// Declaramos requirimientos
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3020;
const productos = []; 

// Permite leer datos de formularios POST (urlencoded)
app.use(express.urlencoded({ extended: true }));

// Declaramos donde se encontraran los archivos estáticos
app.use(express.static(path.join(__dirname, 'Public')));

// Ruta para cargar la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

// Ruta para recibir datos del formulario y guardarlos
app.post('/agregar', (req, res) => {
    const producto = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        precio: req.body.precio,
        stock: req.body.stock
    };
    productos.push(producto);
    res.send('ok');
});

// Ruta para ver la lista de productos guardados
app.get('/productos', (req, res) => {
    let lista = '';
    productos.forEach(p => {
        lista += `<li>
                    <strong>${p.nombre}</strong> (${p.categoria})<br>
                    Precio: $${p.precio}<br>
                    Stock: ${p.stock} unidades
                  </li>`;
    });
    res.send(lista || '<li>No hay productos aún</li>');
});

//LLamamos al servidor
app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
});
