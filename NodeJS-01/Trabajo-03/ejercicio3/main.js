//Declaramos requirimientos
const express = require("express");
const app = express();
const path = require("path");

//declaramos donde se encontraran los archivos
app.use(express.static(path.join(__dirname, 'Public')));

app.get('/PaginaPrincipal', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

//LLamamos al servidor
app.listen(5000, () => {
	console.log("http://127.0.0.1:5000");
});