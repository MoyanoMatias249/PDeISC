import express from 'express';
import sql from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email, incluyendo el password hasheado
    const [user] = await sql`
      SELECT id, nombre, email, password FROM usuarios WHERE email = ${email}
    `;

    if (!user) {
      // Usuario no encontrado
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Comparar password en texto plano con el hash almacenado
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Contraseña incorrecta
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Password correcto: devolver usuario sin la contraseña
    const { password: _, ...userSinPassword } = user;
    return res.json(userSinPassword);

  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;

