import ReclamosTipoService from '../services/reclamosTipoService.js';

export default class ReclamosTipoController {

    constructor () {
        this.reclamosTipoService = new ReclamosTipoService();
    }

    getReclamosTipo = async (req, res) => {
        try {
            const result = await this.reclamosTipoService.getReclamosTipo();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener reclamos Tipo' });
        }
    }
    

    getReclamosTipoById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.reclamosTipoService.getReclamosTipoById(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Reclamo Tipo no encontrado' });
            }
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Reclamo Tipo' });
        }
    };

    addReclamosTipo = async (req, res) => {
        const { descripcion, activo } = req.body;
        try {
            const result = await this.reclamosTipoService.addReclamosTipo({descripcion, activo});
            if (result.affectedRows > 0) {
                res.status(201).json({ id: result.insertId, descripcion, activo });
            } else {
                res.status(500).json({ error: "No se pudo crear el Reclamo Tipo" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el Reclamo Tipo' });
        }
    };

    deleteReclamosTipo = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.reclamosTipoService.deleteReclamosTipo(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Reclamo Tipo no encontrada' });
            }
            res.status(200).json({ message: 'Reclamo Tipo eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el Reclamo Tipo' });
        }
    };

    updateReclamosTipo = async (req, res) => {
        try{
            const { id } = req.params;
            const campos = req.body;
            const result = await this.reclamosTipoService.updateReclamosTipo(id, campos);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "No se pudo modificar el Reclamo Tipo"    
                })
            }
            
            res.status(200).json({
                mensaje: "Reclamo Tipo modificado"
            });

        }catch(error){
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    };
}