// controllers/authController.js
import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

// Registrar un nuevo usuario con rol 'Usuario' por defecto.
// Hashea la contraseña y guarda los datos en la base de datos.
export const register = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    const hashed = await bcrypt.hash(contraseña, SALT_ROUNDS);

    const result = await pool.query(
      `INSERT INTO usuarios (nombre, correo, contraseña, id_rol)
       VALUES ($1, $2, $3, (SELECT id_rol FROM roles WHERE nombre = 'Usuario'))
       RETURNING id_usuario`,
      [nombre, correo, hashed]
    );

    res.status(201).json({ message: 'Usuario registrado correctamente', id_usuario: result.rows[0].id_usuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Iniciar sesión con correo y contraseña.
// Verifica credenciales, obtiene el rol y genera un token JWT.
export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

    const match = await bcrypt.compare(contraseña, user.contraseña);
    if (!match) return res.status(400).json({ error: 'Credenciales inválidas' });

    const rolRes = await pool.query('SELECT nombre FROM roles WHERE id_rol = $1', [user.id_rol]);
    const rolNombre = rolRes.rows[0]?.nombre || 'Usuario';

    const token = jwt.sign(
      { id_usuario: user.id_usuario, rol: rolNombre },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        rol: rolNombre
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};


export const socialLogin = async (req, res) => {
  const { nombre, correo, token, proveedor } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    let user = result.rows[0];

    if (!user) {
      const nuevo = await pool.query(
        `INSERT INTO usuarios (nombre, correo, contraseña, id_rol)
         VALUES ($1, $2, '', (SELECT id_rol FROM roles WHERE nombre = 'Usuario'))
         RETURNING *`,
        [nombre, correo]
      );
      user = nuevo.rows[0];
    }

    const rolRes = await pool.query('SELECT nombre FROM roles WHERE id_rol = $1', [user.id_rol]);
    const rolNombre = rolRes.rows[0]?.nombre || 'Usuario';

    const jwtToken = jwt.sign(
      { id_usuario: user.id_usuario, rol: rolNombre },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token: jwtToken,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        rol: rolNombre
      }
    });
  } catch (err) {
    console.error('Error en login social:', err);
    res.status(500).json({ error: 'Error en login social' });
  }

};
