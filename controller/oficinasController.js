import { pool } from '../database/connectionMySql.js';

const getOficinas = async (req, res) => {
    try {
        const query = 'SELECT idOficina, nombre, idReclamoTipo, activo FROM oficinas WHERE activo';
        const [result] = await pool.query(query);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las oficinas' });
    }
}

const getOficinaById = async (req, res) => {
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

const addOficina = async (req, res) => {
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

const deleteOficina = async (req, res) => {
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

const updateOficina = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, idReclamoTipo, activo } = req.body;

        if (!nombre || !idReclamoTipo || !activo) { // Si activo es 0 va a dar error
            return res.status(404).json({
                mensaje: "Faltan datos, por favor verifique."    
            })
        }

        // ToDo - Verificar que idReclamoTipo sea un valor valido y activo sea 0 ó 1.
        // if (activo === undefined || activo === null) o verificar el valor? activo === 0 o activo === 1

        const sql = 'UPDATE oficinas SET nombre = ? , idReclamoTipo = ?, activo = ?  WHERE idOFicina = ?';
        const [result] = await pool.query(sql, [nombre, idReclamoTipo, activo, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo modificar."    
            })
        }
        
        res.status(200).json({
            mensaje: "Oficina modificada"
        });

    }catch(error){
        res.status(500).json({
            mensaje: "Error interno."
        })
    }
};

export default {
    getOficinas,
    getOficinaById,
    addOficina,
    deleteOficina,
    updateOficina
}