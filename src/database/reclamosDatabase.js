import { pool } from './connectionMySql.js';
import EmailService from '../mailer/mailService.js'; 



export default class ReclamosDatabase {
    
    
    constructor () {       
        this.emailService=new EmailService();
    }


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
       
        //Obtener el estado actual del reclamo para compararlo luego de la actualizacion.
        const reclamoActual=await this.getReclamoById(id);
        const estadoReclamo=reclamoActual[0].EstadoReclamo;

        const campos = Object.keys(reclamo);
        const valores = campos.map((campo) => reclamo[campo]);
        const consulta = `UPDATE reclamos SET ${campos
        .map((campo) => `${campo} = ?`)
        .join(", ")} WHERE idReclamo = ?`;
            
        try {
        const [result] = await pool.query(consulta, [...valores, id]);
        if (result.affectedRows > 0) {
            // Obtener el estado actual del reclamo luego de ser actualizado.
            const reclamoActualizado = await this.getReclamoById(id);            
            // Envio mail solo si cambio el estado del reclamo.
            await this.enviarMail(estadoReclamo,reclamoActualizado)
            return reclamoActualizado[0];
        
        i    
        } else {
            return null;
        }
        } catch (error) {
        console.error("Error al actualizar el reclamo:", error);
        throw error;
        }
    };

    // Metodo de envio mail.
    enviarMail=async(estadoReclamo,reclamoActualizado)=>{       
       
        if(estadoReclamo !== reclamoActualizado[0].EstadoReclamo){         
            try {
                await this.emailService.sendEmail(
                    'luisfelipe782006@gmail.com', 
                    'Estado del Reclamo Actualizado',
                    //Contenido del correo
                    {
                        "asunto":"Notificación de Reclamos",
                        "nombre":reclamoActualizado[0].CreadorUsuario.toUpperCase(),
                        "id":reclamoActualizado[0].idReclamo,
                        "asuntoReclamo": reclamoActualizado[0].asunto.toUpperCase(),
                        "estadoActual":reclamoActualizado[0].EstadoReclamo.toUpperCase(),
                        "buttonLink":"https://google.com.ar",                                        
                    }
                );
               
            } catch (error) {
                console.log(error)
            }          
        }
        
    }
}