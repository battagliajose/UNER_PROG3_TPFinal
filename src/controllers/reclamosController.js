import reclamosService from '../services/reclamosService.js';

export default class ReclamosController {

    constructor() {
        this.reclamosService = new reclamosService();
    }

    getAllReclamos = async (req, res) => {
        try {
            const result = await this.reclamosService.getAllReclamos();
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
            if (!result) {
                return res.status(404).json({ error: 'Reclamo no encontrado' });
            }
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el reclamo' });
        }
    };

    createReclamo = async (req, res) => {
        const { asunto, descripcion, idReclamoEstado, idReclamoTipo, idUsuarioCreador } = req.body;
        try {
            const result = await this.reclamosService.createReclamo({ asunto, descripcion, idReclamoEstado, idReclamoTipo, idUsuarioCreador });
            res.status(201).json({ idReclamo: result.idReclamo, asunto, descripcion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el reclamo' });
        }
    };

    deleteReclamo = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.reclamosService.deleteReclamo(id);
            if (!result) {
                return res.status(404).json({ error: 'Reclamo no encontrado' });
            }
            res.status(200).json({ message: 'Reclamo eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el reclamo' });
        }
    };

    updateReclamo = async (req, res) => {
        const { id } = req.params;
        const campos = req.body;
        try {
            const result = await this.reclamosService.updateReclamo(id, campos);
            if (!result) {
                return res.status(404).json({ message: 'No se pudo modificar el reclamo.' });
            }
            res.status(200).json({ message: 'Reclamo modificado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno.' });
        }
    };
}