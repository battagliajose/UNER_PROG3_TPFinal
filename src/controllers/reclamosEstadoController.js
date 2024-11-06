import ReclamosEstadoService from '../services/reclamosEstadoService.js';

export default class ReclamosEstadoController {

    constructor () {
        this.reclamosEstadoService = new ReclamosEstadoService();
    }

    getReclamosEstado = async (req, res) => {
        try {
            const result = await this.reclamosEstadoService.getReclamosEstado();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener reclamos Estado' });
        }
    }
    
    getReclamosEstadoById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.reclamosEstadoService.getReclamosEstadoById(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Reclamo Estado no encontrado' });
            }
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Reclamo Estado' });
        }
    };

    addReclamosEstado = async (req, res) => {
        const { descripcion, activo } = req.body;
        try {
            const result = await this.reclamosEstadoService.addReclamosEstado({descripcion, activo});
            if (result.affectedRows > 0) {
                res.status(201).json({ id: result.insertId, descripcion, activo });
            } else {
                res.status(500).json({ error: "No se pudo crear el Reclamo Estado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el Reclamo Estado' });
        }
    };

    deleteReclamosEstado = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.reclamosEstadoService.deleteReclamosEstado(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Reclamo Estado no encontrada' });
            }
            res.status(200).json({ message: 'Reclamo Estado eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el Reclamo Estado' });
        }
    };

    updateReclamosEstado = async (req, res) => {
        try{
            const { id } = req.params;
            const campos = req.body;
            const result = await this.reclamosEstadoService.updateReclamosEstado(id, campos);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "No se pudo modificar el Reclamo Estado"    
                })
            }
            
            res.status(200).json({
                mensaje: "Reclamo Estado modificado"
            });

        }catch(error){
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    };
}