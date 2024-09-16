import { pool } from '../database/connectionMySql.js';

export const getOficinas = async (req, res) => {
    try {
        const query = 'SELECT idOficina, nombre, idReclamoTipo, activo FROM oficinas WHERE activo';
        const [result] = await pool.query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las oficinas' });
    }
}

export const getOficinaById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT idOficina, nombre, idReclamoTipo, activo FROM oficinas WHERE idOficina = ?';
        const [result] = await pool.query(query, [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Oficina no encontrada' });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la oficina' });
    }
};

export const addOficina = async (req, res) => {
    const { nombre, idReclamoTipo, activo } = req.body;
    try {
        const query = 'INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [nombre, idReclamoTipo, activo]);
        res.status(201).json({ id: result.insertId, idReclamoTipo, activo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar la oficina' });
    }
};

export const deleteOficina = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'UPDATE oficinas SET activo = 0 WHERE idOficina = ?';
        const [result] = await pool.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Oficina no encontrada' });
        }
        res.status(200).json({ message: 'Oficina eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la oficina' });
    }
};