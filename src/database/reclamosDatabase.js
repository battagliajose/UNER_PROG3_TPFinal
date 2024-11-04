import { pool } from './connectionMySql.js';

export default class ReclamosDatabase {

    getReclamos = async (limit = 0, offset = 0) => {
        try {
            let query = `SELECT   r.idReclamo,
                                    r.asunto,
                                    r.descripcion,
                                    r.fechaCreado,
                                    r.fechaFinalizado,
                                    r.fechaCancelado,
                                    re.descripcion AS EstadoDescripcion,
                                    rt.descripcion AS TipoDescripcion,
                                    r.idUsuarioCreador,
                                    uc.nombre AS CreadorUsuario,
                                    uf.nombre AS FinalizaUsuario
                        FROM reclamos AS r
                        LEFT JOIN reclamos_estado AS re ON r.idReclamoEstado = re.idReclamoEstado
                        LEFT JOIN reclamos_tipo AS rt ON r.idReclamoTipo = rt.idReclamoTipo
                        LEFT JOIN usuarios AS uc ON r.idUsuarioCreador = uc.idUsuario 
                        LEFT JOIN usuarios AS uf ON r.idUsuarioFinalizador = uf.idUsuario`;

            // Agrega LIMIT y OFFSET si son válidos
            if (limit > 0 && offset >= 0) {
                query += ' LIMIT ? OFFSET ?'; 
            }

            // Ejecutar la consulta
            const params = (limit > 0 && offset >= 0) ? [limit, offset] : [];
            const [result] = await pool.query(query, params);
            return result;
        } catch (error) {
            console.error('Error en SQL:', error);
            throw error;
        }

    }


    getReclamosByUser = async (limit = 0, offset = 0 ,usuario) => {
        try {
            const idUsuario = usuario.idUsuario;
            let query = `SELECT   r.idReclamo,
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

            const [result] = await pool.query(query, [limit, offset, usuario]);
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

    buscarDatosReportePdf = async () => {        
        const query = 'CALL `datosPDF`()';

        const [result] = await pool.query(query);

        const datosReporte = {
            reclamosTotales : result[0][0].reclamosTotales,
            reclamosNoFinalizados : result[0][0].reclamosNoFinalizados,
            reclamosFinalizados : result[0][0].reclamosFinalizados,
            descripcionTipoRreclamoFrecuente : result[0][0].descripcionTipoRreclamoFrecuente,
            cantidadTipoRreclamoFrecuente : result[0][0].cantidadTipoRreclamoFrecuente
        }

        return datosReporte;
    }

    buscarDatosReporteCsv = async () => {
        const query = `SELECT r.idReclamo as 'reclamo', rt.descripcion as 'tipo', re.descripcion AS 'estado',
                     DATE_FORMAT(r.fechaCreado, '%Y-%m-%d %H:%i:%s') AS 'fechaCreado', CONCAT(u.nombre, ' ', u.apellido) AS 'cliente'
                    FROM reclamos AS r 
                    INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo 
                    INNER JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado 
                    INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador 
                        WHERE r.idReclamoEstado <> 4;`;//los que no están finalizados

        const [result] = await pool.query(query);
        return result;
    }


    //reutilizo la la llamada al procedimiento datosPDF
    //para no crear un nuevo procedimiento en mysql y que no se encuentre en exposición final
    //se podría llamar a uno totoalmente independiente con otros datos estadísticos
    getEstadisticas = async () => {
        try {
            const query = 'CALL `datosPDF`()';
            const [result] = await pool.query(query);
    
            // Verifica que el resultado tenga datos
            if (result.length === 0 || result[0].length === 0) {
                throw new Error('No se encontraron datos en el resultado.');
            }
    
            const datosReporte = {
                reclamosTotales: result[0][0].reclamosTotales,
                reclamosNoFinalizados: result[0][0].reclamosNoFinalizados,
                reclamosFinalizados: result[0][0].reclamosFinalizados,
                descripcionTipoRreclamoFrecuente: result[0][0].descripcionTipoRreclamoFrecuente,
                cantidadTipoRreclamoFrecuente: result[0][0].cantidadTipoRreclamoFrecuente
            };
    
            return datosReporte;
        } catch (error) {
            console.error('Error al obtener estadísticas:', error.message, error.stack)
            throw error
        }
    }; 
}