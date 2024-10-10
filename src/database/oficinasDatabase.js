import { pool } from './connectionMySql.js';

export default class OficinasDatabase {
    getOficinas = async () => {
        try {
            const query = `SELECT o.idOficina, o.nombre, rt.descripcion, o.activo FROM oficinas as o
                            INNER JOIN reclamos_tipo as rt ON o.idReclamoTipo = rt.idReclamoTipo
                            WHERE o.activo`;
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getOficinaById = async (id) => {
        try {
            const query = `SELECT o.idOficina, o.nombre, rt.descripcion, o.activo FROM oficinas as o
                            INNER JOIN reclamos_tipo as rt ON o.idReclamoTipo = rt.idReclamoTipo
                            WHERE idOficina = ?`;
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    addOficina = async (nuevaOficina) => {
        const { nombre, idReclamoTipo, activo } = nuevaOficina;
        try {
            const query = 'INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?, ?, ?)';
            const [result] = await pool.query(query, [nombre, idReclamoTipo, activo]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    deleteOficina = async (id) => {
        try {
            const query = 'UPDATE oficinas SET activo = 0 WHERE idOficina = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    updateOficina = async (id, oficina) => {
        const campos = Object.keys(oficina);
        const valores = campos.map((campo) => oficina[campo]);
        const consulta = `UPDATE oficinas SET ${campos
        .map((campo) => `${campo} = ?`)
        .join(", ")} WHERE idOficina = ?`;
    
        try {
        const [result] = await pool.query(consulta, [...valores, id]);
        if (result.affectedRows > 0) {
            const [oficinaActualizada] = await pool.query(
            "SELECT * FROM oficinas WHERE idOficina = ?",
            [id]
            );
            return oficinaActualizada[0];
        } else {
            return null;
        }
        } catch (error) {
        console.error("Error al actualizar la oficina:", error);
        throw error;
        }
    };
}