// backend/index.js
import express from 'express';
import cors from 'cors';
import sql from './db.js';
import authRoutes from './routes/auth.js';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Usuario por defecto
const usuarioInicial = {
  nombre: 'Admin',
  email: 'admin@admin.com',
  password: '1234',
};

// Crear usuario inicial si no existe
async function crearUsuarioInicial() {
  try {
    const [user] = await sql`
      SELECT * FROM usuarios WHERE email = ${usuarioInicial.email}
    `;

    if (!user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(usuarioInicial.password, saltRounds);

      await sql`
        INSERT INTO usuarios (nombre, email, password)
        VALUES (${usuarioInicial.nombre}, ${usuarioInicial.email}, ${hashedPassword})
      `;
      console.log('Usuario inicial creado');
    } else {
      console.log('Usuario inicial ya existe');
    }
  } catch (err) {
    console.error('Error al crear el usuario inicial:', err);
  }
}

// Iniciar backend
sql`SELECT 1`
  .then(async () => {
    console.log('Conexión a la base de datos exitosa');
    await crearUsuarioInicial();

    app.use('/api', authRoutes);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Error de conexión:', err));
