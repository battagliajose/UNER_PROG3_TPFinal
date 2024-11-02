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
                                    r.idUsuarioCreador,
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

    getReclamosByUser = async (usuario) => {
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
            const [result] = await pool.query(query, [idUsuario]);
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

    //procedimiento almacenado SQL
    //Función asincrónica para obtener datos específicos para el reporte en formato PDF
    buscarDatosReportePdf = async () => {
        // Consulta SQL que llama al procedimiento almacenado `datosPDF`        
        const sql = 'CALL `datosPDF`()';

        // Ejecución la consulta y espera el resultado; el resultado es un arreglo de filas
        const [result] = await conexion.query(sql);
        
        // Creación objeto `datosReporte` * contiene los datos necesarios p/reporte PDF
        const datosReporte = {
            reclamosTotales : result[0][0].reclamosTotales,
            reclamosNoFinalizados : result[0][0].reclamosNoFinalizados,
            reclamosFinalizados : result[0][0].reclamosFinalizados,
            descripcionTipoRreclamoFrecuente : result[0][0].descripcionTipoRreclamoFrecuente,
            cantidadTipoRreclamoFrecuente : result[0][0].cantidadTipoRreclamoFrecuente
        }

        //Retorna objeto `datosReporte` con los datos PDF
        return datosReporte;
    }

    //procedimiento almacenado SQL para obtener los datos para reporte csv
    buscarDatosReporteCsv = async () => {

        // Consulta SQL que selecciona datos de la tabla reclamos y tablas relacionadas
        const sql = `SELECT r.idReclamo as 'reclamo', rt.descripcion as 'tipo', re.descripcion AS 'estado',
                     DATE_FORMAT(r.fechaCreado, '%Y-%m-%d %H:%i:%s') AS 'fechaCreado', CONCAT(u.nombre, ' ', u.apellido) AS 'cliente'
                    FROM reclamos AS r 
                    INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo 
                    INNER JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado 
                    INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador 
                        WHERE r.idReclamoEstado <> 4;`;

        //Ejecución de la consulta y espera del resultado
        //arreglo de objetos (cada objeto representa un reclamo)                            
        const [result] = await conexion.query(sql);
        
        // Retorna el resultado de la consulta para generar archivo CSV
        return result;
    };

}