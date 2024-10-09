import { pool } from './connectionMySql.js';

export default class ReclamosDatabase {
    getReclamos = async () => {
        try {
            const query = `SELECT   idReclamo,
                                    asunto,
                                    descripcion,
                                    fechaCreado,
                                    fechaFinalizado,
                                    fechaCancelado,
                                    idReclamoEstado,
                                    idReclamoTipo,
                                    idUsuarioCreador,
                                    idUsuarioFinalizador
                                FROM reclamos`;
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getReclamoById = async (id) => {
        try {
            const query = `SELECT   idReclamo,
                                    asunto,
                                    descripcion,
                                    fechaCreado,
                                    fechaFinalizado,
                                    fechaCancelado,
                                    idReclamoEstado,
                                    idReclamoTipo,
                                    idUsuarioCreador,
                                    idUsuarioFinalizador
                                FROM reclamos
                                WHERE idReclamo = ?`;
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    addReclamo = async (nuevoReclamo) => {
        const {
            asunto,
            descripcion,
            fechaCreado,
            fechaFinalizado,
            fechaCancelado,
            idReclamoEstado,
            idReclamoTipo,
            idUsuarioCreador,
            idUsuarioFinalizador } = nuevoReclamo;
        try {
            const query = `INSERT INTO reclamos (
                                    asunto,
                                    descripcion,
                                    fechaCreado,
                                    fechaFinalizado,
                                    fechaCancelado,
                                    idReclamoEstado,
                                    idReclamoTipo,
                                    idUsuarioCreador,
                                    idUsuarioFinalizador) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const [result] = await pool.query(query, [
                asunto,
                descripcion,
                fechaCreado,
                fechaFinalizado,
                fechaCancelado,
                idReclamoEstado,
                idReclamoTipo,
                idUsuarioCreador,
                idUsuarioFinalizador]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    deleteReclamo = async (id) => {
        try {
            const query = 'DELETE FROM reclamos WHERE idReclamo = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    updateReclamo = async (id, reclamo) => {
        const campos = Object.keys(reclamo);
        const valores = campos.map((campo) => reclamo[campo]);
        const consulta = `UPDATE reclamos SET ${campos
        .map((campo) => `${campo} = ?`)
        .join(", ")} WHERE idReclamo = ?`;
    
        try {
        const [result] = await pool.query(consulta, [...valores, id]);
        if (result.affectedRows > 0) {
            const [reclamoActualizado] = await pool.query(
            "SELECT * FROM reclamos WHERE idReclamo = ?",
            [id]
            );
            return reclamoActualizado[0];
        } else {
            return null;
        }
        } catch (error) {
        console.error("Error al actualizar el reclamo:", error);
        throw error;
        }
    };
}