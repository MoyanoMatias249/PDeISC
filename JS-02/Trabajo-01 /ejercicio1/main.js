// Declaramos requirimientos
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3010;

// Declaramos donde se encontraran los archivos estáticos
app.use(express.static(path.join(__dirname, 'Public')));

//LLamamos al servidor
app.listen(PORT, () => {
	console.log(`http://127.0.0.1:${PORT}`);
});

