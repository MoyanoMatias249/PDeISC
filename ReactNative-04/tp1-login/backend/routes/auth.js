// backend/routes/auth.js
import express from 'express';
import sql from '../db.js';

const router = express.Router();

// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await sql`
      SELECT id, nombre, email FROM usuarios
      WHERE email = ${email} AND password = ${password}
    `;

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    return res.json(user);
  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
