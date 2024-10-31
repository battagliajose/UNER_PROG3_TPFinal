import ReclamosService from '../services/reclamosService.js';

export default class ReclamosController {

    constructor () {
        this.reclamosService = new ReclamosService();
    }

    getReclamos = async (req, res) => {

        //Paginación
        const limit = req.query.limit;
        const offset = req.query.offset;

        try{
            //Si limit y offset no están definidos no se realiza la paginación
            // los voy a pasar como parámetros
            let pLimit = limit ? Number(limit) : 0;
            let pOffset = offset ? Number(offset) : 0;
            
        
            const usuario = req.user;
            const result = await this.reclamosService.getReclamos(limit, offset, usuario);
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
        const { 
            asunto,
            descripcion,
            idReclamoTipo,
        } = req.body;
        const idUsuarioCreador = req.user.idUsuario;

        try {
            const result = await this.reclamosService.addReclamo({
                asunto,
                descripcion,
                idReclamoTipo,
                idUsuarioCreador});
            if (result.affectedRows > 0) {
                res.status(201).json({ id: result.insertId,
                    asunto,
                    descripcion,
                    /*fechaCreado,
                    fechaFinalizado,
                    fechaCancelado,
                    **Hacer GetReclamoByID para devolver el reclamo creado**
                    idReclamoEstado,
                    idReclamoTipo,
                    idUsuarioCreador,
                    idUsuarioFinalizador */});
            } else {
                res.status(500).json({ error: "No se pudo crear el reclamo" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el reclamo' });
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
            
            res.status(200).json({
                mensaje: "Reclamo modificado"
            });            

        }catch(error){
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    };

    cancelReclamo = async (req, res) => {
       
        try{
            const { id } = req.params;
            const usuario = req.user;

            const result = await this.reclamosService.cancelReclamo(usuario, id);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "No se pudo cancelar."    
                })
            }                     
            
            res.status(200).json({
                mensaje: "Reclamo cancelado"
            });            

        }catch(error){
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    };

    cambiarEstadoReclamo = async (req, res) => {
       
        try{
            const { id } = req.params;
            const usuario = req.user;
            const { idReclamoEstado } = req.body;

            const result = await this.reclamosService.cambiarEstadoReclamo(usuario, id, idReclamoEstado);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "No se pudo cambiar el estado."    
                })
            }                     
            
            res.status(200).json({
                mensaje: "Estado del reclamo cambiado."
            });            

        }catch(error){
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    };
}