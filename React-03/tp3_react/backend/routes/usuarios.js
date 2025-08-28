// backend/routes/usuarios.js
import express from 'express';
import { conectarBD } from '../dbconnection.js';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    const db = await conectarBD();
    const [rows] = await db.execute('SELECT * FROM usuarios');
    res.json(rows);
});

// Crear nuevo usuario
router.post('/', async (req, res) => {
    const db = await conectarBD();
    const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;

    const sql = `INSERT INTO usuarios (nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await db.execute(sql, [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email]);
    res.json({ mensaje: 'Usuario creado' });
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
    const db = await conectarBD();
    const { id } = req.params;
    await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ mensaje: 'Usuario eliminado' });
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
    const db = await conectarBD();
    const { id } = req.params;
    const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;

    const sql = `UPDATE usuarios SET nombre=?, apellido=?, direccion=?, telefono=?, celular=?, fecha_nacimiento=?, email=?
                 WHERE id=?`;
    await db.execute(sql, [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, id]);
    res.json({ mensaje: 'Usuario actualizado' });
});

export default router;
