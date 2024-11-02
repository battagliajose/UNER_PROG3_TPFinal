import ReclamosService from '../services/reclamosService.js';

//arreglo de formatos permitidos para el informe del admin
const formatosPermitidos = ['pdf', 'csv'];

export default class ReclamosController {

    constructor () {
        this.reclamosService = new ReclamosService();
    }

    getReclamos = async (req, res) => {
        try {
            const usuario = req.user;
            const result = await this.reclamosService.getReclamos(usuario);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener los reclamos' });
        }
    };

    //informe pdf o csv
    informe = async (req, res) => {

        try{
            const formato = req.query.formato; //recibo request del cliente
            //salgo si es distinto al formato permitido -array declarado line 4-
            if(!formato || !formatosPermitidos.includes(formato)){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Formato inválido para el informe."    
                })
            }
            
            // generar informe
            const {buffer, path, headers} = await this.reclamosService.generarInforme(formato);

            // setear la cabecera de respuesta HTTP que se enviará al cliente
            res.set(headers)

            if (formato === 'pdf') {
                //respuesta al cliente para el pdf
                //método end() se utiliza para finalizar la respuesta HTTP
                //método end() se utiliza para finalizar la respuesta HTTP                
                //Al pasar el arg buffer a end() el servidor envía el contenido PDF al cliente                
                //cliente recibirá el archivo PDF y podrá mostrarlo o permitir su descarga
                res.status(200).end(buffer);
            } else if (formato === 'csv') {
                //respuesta al cliente para csv                
                //método download va enviar un archivo al cliente 
                //sugiriendo la descarga
                //arg path es la ruta del archivo se desea enviar              
                res.status(200).download(path, (err) => {
                    if (err) {
                        return res.status(500).send({
                            estado:"Falla",
                            mensaje: " No se pudo generar el informe."    
                        })
                    }
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        } 
    };


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