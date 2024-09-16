import { pool } from '../database/connectionMySql.js';

export const getUsuarios = async (req, res) => {
    try {
        const query = 'SELECT idUsuario, nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo FROM usuarios';
        const [result] = await pool.query(query)
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT idUsuario, nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo FROM usuarios WHERE idUsuario = ?';
    try {
        const [result] = await pool.query(query, [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

export const addUsuario = async (req, res) => {
    const { nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo } = req.body;
    const query = 'INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    try {
        const [result] = await pool.query(query, [nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo]);
        res.status(201).json({ id: result.insertId, nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el usuario' });
    }
};

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE idUsuario = ?';
    try {
        const [result] = await pool.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};