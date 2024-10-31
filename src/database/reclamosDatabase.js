import { pool } from './connectionMySql.js';

export default class ReclamosDatabase {

    getReclamos = async (limit = 0, offset = 0) => {
        try {
            const query = `SELECT   r.idReclamo,
                                    r.asunto,
                                    r.descripcion,
                                    r.fechaCreado,
                                    r.fechaFinalizado,
                                    r.fechaCancelado,
                                    re.descripcion,
                                    rt.descripcion,
                                    r.idUsuarioCreador,
                                    uc.nombre AS CreadorUsuario,
                                    uf.nombre AS FinalizaUsuario
                                FROM reclamos as r
                                LEFT JOIN reclamos_estado as re ON r.idReclamoEstado = re.idReclamoEstado
                                LEFT JOIN reclamos_tipo as rt ON r.idReclamoTipo = rt.idReclamoTipo
                                LEFT JOIN usuarios as uc ON r.idUsuarioCreador = uc.idUsuario 
                                LEFT JOIN usuarios as uf ON r.idUsuarioFinalizador = uf.idUsuario`;
            
            if (limit) {
                query += 'LIMIT ? OFFSET ? ';
            }                                                    
            const [result] = await pool.query(query [limit, offset]);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getReclamosByUser = async (limit = 0, offset = 0 ,usuario) => {
        try {
            const idUsuario = usuario.idUsuario;
            const query = `SELECT   r.idReclamo,
                                    r.asunto,
                                    r.descripcion,
                                    r.fechaCreado,
                                    r.fechaFinalizado,
                                    r.fechaCancelado,
                                    re.descripcion,
                                    rt.descripcion,
                                    r.idUsuarioCreador,
                                    uc.nombre AS CreadorUsuario,
                                    uf.nombre AS FinalizaUsuario
                                FROM reclamos as r
                                LEFT JOIN reclamos_estado as re ON r.idReclamoEstado = re.idReclamoEstado
                                LEFT JOIN reclamos_tipo as rt ON r.idReclamoTipo = rt.idReclamoTipo
                                LEFT JOIN usuarios as uc ON r.idUsuarioCreador = uc.idUsuario 
                                LEFT JOIN usuarios as uf ON r.idUsuarioFinalizador = uf.idUsuario
                                WHERE idUsuarioCreador = ?`;
                       
             
            if (limit) {
                query += 'LIMIT ? OFFSET ? ';
                       }                         

            const [result] = await pool.query(query, [idUsuario, limit, offset]);
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
                                    r.idReclamoEstado,
                                    re.descripcion as EstadoReclamo,
                                    r.idReclamoTipo,
                                    rt.descripcion as TipoReclamo,                                    
                                    r.idUsuarioCreador,
                                    uc.nombre AS CreadorUsuario,
                                    uf.nombre AS FinalizaUsuario
                                FROM reclamos as r
                                LEFT JOIN reclamos_estado as re ON r.idReclamoEstado = re.idReclamoEstado
                                LEFT JOIN reclamos_tipo as rt ON r.idReclamoTipo = rt.idReclamoTipo
                                LEFT JOIN usuarios as uc ON r.idUsuarioCreador = uc.idUsuario 
                                LEFT JOIN usuarios as uf ON r.idUsuarioFinalizador = uf.idUsuario
                                WHERE idReclamo = ?`;
            const [result] = await pool.query(query, [id]);
            return result[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    getReclamosByTipo = async (idReclamoTipo) => {
        try {
            const query = `SELECT   r.idReclamo,
                                    r.asunto,
                                    r.descripcion,
                                    r.fechaCreado,
                                    r.fechaFinalizado,
                                    r.fechaCancelado,
                                    r.idReclamoEstado,
                                    re.descripcion as EstadoReclamo,
                                    r.idReclamoTipo,
                                    rt.descripcion as TipoReclamo,                                    
                                    r.idUsuarioCreador,
                                    uc.nombre AS CreadorUsuario,
                                    uf.nombre AS FinalizaUsuario
                                FROM reclamos as r
                                LEFT JOIN reclamos_estado as re ON r.idReclamoEstado = re.idReclamoEstado
                                LEFT JOIN reclamos_tipo as rt ON r.idReclamoTipo = rt.idReclamoTipo
                                LEFT JOIN usuarios as uc ON r.idUsuarioCreador = uc.idUsuario 
                                LEFT JOIN usuarios as uf ON r.idUsuarioFinalizador = uf.idUsuario
                                WHERE r.idReclamoTipo = ?`;
            const [result] = await pool.query(query, [idReclamoTipo]);
            return result[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    addReclamo = async (nuevoReclamo) => {
        const {
            asunto,
            descripcion,
            idReclamoTipo,
            idUsuarioCreador,
         } = nuevoReclamo;
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
                                VALUES (?, ?, now(), null, null, 1, ?, ?, null)`;
            const [result] = await pool.query(query, [
                asunto,
                descripcion,
                idReclamoTipo,
                idUsuarioCreador]);
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
                return reclamoActualizado;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error al actualizar el reclamo:", error);
            throw error;
        }
    };
}