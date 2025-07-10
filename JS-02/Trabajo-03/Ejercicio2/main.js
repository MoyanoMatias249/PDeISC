const express = require("express");
const app = express();
const path = require("path");

const PORT = 5010;

// Servir archivos estáticos desde la carpeta Public
app.use(express.static(path.join(__dirname, 'public')));


// Ruta principal
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
})