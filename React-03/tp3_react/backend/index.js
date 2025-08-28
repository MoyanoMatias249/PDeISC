// backend/index.js
import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios.js';

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/usuarios', usuariosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

