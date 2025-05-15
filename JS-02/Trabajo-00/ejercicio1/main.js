// Declaramos requirimientos
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3020;
const personas = [];

// Permite leer datos de formularios POST (urlencoded)
app.use(express.urlencoded({extended: true}));

// Declaramos donde se encontraran los archivos estáticos
app.use(express.static(path.join(__dirname, 'Public')));

// Ruta para cargar la página principal
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

// Ruta para recibir datos del formulario y guardarlos
app.post('/enviar', (req, res) => {
	const persona = {
		user: req.body.user, 
		email: req.body.mail,
		pass: req.body.pass
	};
	personas.push(persona)
	console.log(personas)
	res.send('ok');
});

// Ruta para ver la lista de usuarios guardados
app.get('/personas', (req, res) =>{
	let lista = '';
	personas.forEach(p => {
		lista += `<li> 
					<span>USUARIO:</span> ${p.user}<br> 
					<span>EMAIL:</span> ${p.email}<br> 
					<span>CONTRASEÑA:</span> ${p.pass}
				</li>`
	});
	res.send(lista || '<li>No hay usuarios aún</li>');
})

//LLamamos al servidor
app.listen(PORT, () => {
	console.log(`http://127.0.0.1:${PORT}`);
});