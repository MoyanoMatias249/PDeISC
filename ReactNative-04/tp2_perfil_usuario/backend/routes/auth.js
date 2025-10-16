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

// POST /api/oauth-login
router.post('/oauth-login', async (req, res) => {
  const { email, nombre, googleId } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email es requerido' });
  }

  try {
    // Verificar si ya existe usuario con ese email
    const [existing] = await sql`
      SELECT id, nombre, email, password, google_id
      FROM usuarios
      WHERE email = ${email}
    `;

    if (existing) {
      // Ya existe usuario, devolvémoslo
      const { password, ...userSinPass } = existing;
      return res.json(userSinPass);
    }

    // Si no existe, lo creamos
    const [newUser] = await sql`
      INSERT INTO usuarios (nombre, email, google_id)
      VALUES (${nombre}, ${email}, ${googleId})
      RETURNING id, nombre, email, google_id
    `;

    return res.json(newUser);
  } catch (err) {
    console.error('Error en oauth-login:', err);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});

// PUT /api/users/:id
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, direccion, fotoUrl, documentScanUrl } = req.body;

  try {
    const [updatedUser] = await sql`
      UPDATE usuarios
      SET
        nombre = ${nombre},
        telefono = ${telefono},
        direccion = ${direccion},
        foto_url = ${fotoUrl},
        document_scan_url = ${documentScanUrl}
      WHERE id = ${id}
      RETURNING id, nombre, email, telefono, direccion, foto_url, document_scan_url
    `;

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      id: updatedUser.id,
      nombre: updatedUser.nombre,
      email: updatedUser.email,
      telefono: updatedUser.telefono,
      direccion: updatedUser.direccion,
      fotoUrl: updatedUser.foto_url,
      documentScanUrl: updatedUser.document_scan_url,
    });
  } catch (err) {
    console.error('Error actualizando usuario:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;

