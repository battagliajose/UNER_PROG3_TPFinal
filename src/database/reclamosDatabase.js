import { pool } from './connectionMySql.js';

export default class ReclamosDatabase {

    getReclamos = async () => {
        try {
            const query = `SELECT   r.idReclamo,
                                    r.asunto,
                                    r.descripcion,
                                    r.fechaCreado,
                                    r.fechaFinalizado,
                                    r.fechaCancelado,
                                    re.descripcion,
                                    rt.descripcion,
                                    uc.nombre AS CreadorUsuario,
                                    uf.nombre AS FinalizaUsuario
                                FROM reclamos as r
                                LEFT JOIN reclamos_estado as re ON r.idReclamoEstado = re.idReclamoEstado
                                LEFT JOIN reclamos_tipo as rt ON r.idReclamoTipo = rt.idReclamoTipo
                                LEFT JOIN usuarios as uc ON r.idUsuarioCreador = uc.idUsuario 
                                LEFT JOIN usuarios as uf ON r.idUsuarioFinalizador = uf.idUsuario`;
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getReclamoById = async (id) => {
        try {
            const query = `SELECT   r.idReclamo,
                                    r.asunto,
                                    r.descripcion,
                                    r.fechaCreado,
                                    r.fechaFinalizado,
                                    r.fechaCancelado,
                                    re.descripcion as EstadoReclamo,
                                    rt.descripcion as TipoReclamo,                                    
                                    uc.nombre AS CreadorUsuario,
                                    uf.nombre AS FinalizaUsuario
                                FROM reclamos as r
                                LEFT JOIN reclamos_estado as re ON r.idReclamoEstado = re.idReclamoEstado
                                LEFT JOIN reclamos_tipo as rt ON r.idReclamoTipo = rt.idReclamoTipo
                                LEFT JOIN usuarios as uc ON r.idUsuarioCreador = uc.idUsuario 
                                LEFT JOIN usuarios as uf ON r.idUsuarioFinalizador = uf.idUsuario
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

    updateReclamo = async (id, reclamo) => {       
        const campos = Object.keys(reclamo);
        const valores = campos.map((campo) => reclamo[campo]);
        const consulta = `UPDATE reclamos SET ${campos
        .map((campo) => `${campo} = ?`)
        .join(", ")} WHERE idReclamo = ?`;
            
        try {
            const [result] = await pool.query(consulta, [...valores, id]);
            if (result.affectedRows > 0) {
                const reclamoActualizado = await this.getReclamoById(id);            
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