// Declaramos requirimientos
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3020;
let personas = [];


// Configuración para poder recibir datos de formularios
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (index.html, styles, etc.)
app.use(express.static(path.join(__dirname, 'Public')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

// Ruta para recibir los datos del formulario y guardarlos
app.post('/enviar', (req, res) => {
    const nuevaPersona = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        nacimiento: req.body.nacimiento,
        sexo: req.body.sexo,
        documento: req.body.documento,
        estadoCivil: req.body.estadoCivil,
        nacionalidad: req.body.nacionalidad,
        telefono: req.body.telefono,
        email: req.body.email,
        hijos: req.body.hijos,
        cantidadHijos: req.body.cantidadHijos || 0
    };

    personas.push(nuevaPersona);
    console.log(nuevaPersona);

    res.send('ok'); 
});

// Ruta para obtener la lista de personas almacenadas
app.get('/personas', (req, res) => {
    let listaHTML = '';
    personas.forEach(persona => {
        listaHTML += `<li>
                        <span>Nombre:</span> ${persona.nombre} ${persona.apellido}<br>
                        <span>Email:</span> ${persona.email}<br>
                        <span>Teléfono:</span> ${persona.telefono}<br>
                      </li>`;
    });
    res.send(listaHTML || '<li>No hay usuarios aún</li>');
});

//LLamamos al servidor
app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
});

