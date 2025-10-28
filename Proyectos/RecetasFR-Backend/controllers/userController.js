// controllers/userController.js
import pool from '../config/db.js';

// Obtener todos los usuarios del sistema, incluyendo su rol.
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id_usuario, u.nombre, u.correo, r.nombre AS rol
      FROM usuarios u
      LEFT JOIN roles r ON u.id_rol = r.id_rol
      ORDER BY u.id_usuario
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Actualizar el rol de un usuario.
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevo_rol } = req.body;

    const rolRes = await pool.query(
      `SELECT id_rol FROM roles WHERE nombre = $1`,
      [nuevo_rol]
    );
    const id_rol = rolRes.rows[0]?.id_rol;

    if (!id_rol) return res.status(400).json({ error: 'Rol inválido' });

    const result = await pool.query(
      `UPDATE usuarios SET id_rol = $1 WHERE id_usuario = $2 RETURNING id_usuario, nombre, correo, id_rol`,
      [id_rol, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Rol actualizado', usuario: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar rol' });
  }
};

// Eliminar un usuario del sistema.
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [id]);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
