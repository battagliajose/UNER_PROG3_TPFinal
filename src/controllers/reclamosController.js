import ReclamosService from '../services/reclamosService.js';
import EmailService from '../mailer/mailService.js'; 

export default class ReclamosController {

    constructor () {
        this.reclamosService = new ReclamosService();
        this.emailService=new EmailService();
    }

    getReclamo = async (req, res) => {
        try {
            const result = await this.reclamosService.getReclamos();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener los reclamos' });
        }
    }

    getReclamoById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.reclamosService.getReclamoById(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Reclamo no encontrado' });
            }
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el reclamo' });
        }
    };

    addReclamo = async (req, res) => {
        const { asunto,
            descripcion,
            fechaCreado,
            fechaFinalizado,
            fechaCancelado,
            idReclamoEstado,
            idReclamoTipo,
            idUsuarioCreador,
            idUsuarioFinalizador } = req.body;
        try {
            const result = await this.reclamosService.addReclamo({
                asunto,
                descripcion,
                fechaCreado,
                fechaFinalizado,
                fechaCancelado,
                idReclamoEstado,
                idReclamoTipo,
                idUsuarioCreador,
                idUsuarioFinalizador});
            if (result.affectedRows > 0) {
                res.status(201).json({ id: result.insertId,
                    asunto,
                    descripcion,
                    fechaCreado,
                    fechaFinalizado,
                    fechaCancelado,
                    idReclamoEstado,
                    idReclamoTipo,
                    idUsuarioCreador,
                    idUsuarioFinalizador });
            } else {
                res.status(500).json({ error: "No se pudo crear el reclamo" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el reclamo' });
        }
    };

    deleteReclamo = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.reclamosService.deleteReclamo(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Reclamo no encontrado' });
            }
            res.status(200).json({ message: 'Reclamo eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el reclamo' });
        }
    };

    updateReclamo = async (req, res) => {
       
        try{
            const { id } = req.params;
            const campos = req.body;
            const result = await this.reclamosService.updateReclamo(id, campos);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "No se pudo modificar."    
                })
            }

           console.log("Enviando correo");
            //proceso de envio
            try {
                await this.emailService.sendEmail(
                    'luisfelipe782006@gmail.com', 
                    'Estado del Reclamo Actualizado',
                    //Contenido del correo
                    {
                        "asunto":"Notificación de Reclamos",
                        "nombre":result.idUsuarioCreador,
                        "id":id,
                        "asuntoReclamo": result.asunto.toUpperCase(),
                        "estadoActual":result.idReclamoEstado,
                        "buttonLink":"https://google.com.ar",                                        
                    }
                );
               
            } catch (error) {
                console.log(error)
            }
            
            res.status(200).json({
                mensaje: "Reclamo modificado"
            });
            console.log(result);

        }catch(error){
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    };
}