import OficinasService from '../services/oficinasService.js';

export default class OficinasController {

    constructor () {
        this.oficinasService = new OficinasService();
    }

    getOficinas = async (req, res) => {
        try {
            const result = await this.oficinasService.getOficinas();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener las oficinas' });
        }
    }

    getOficinaById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.oficinasService.getOficinaById(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Oficina no encontrada' });
            }
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener la oficina' });
        }
    };

    addOficina = async (req, res) => {
        const { nombre, idReclamoTipo } = req.body;
        try {
            const result = await this.oficinasService.addOficina({ nombre, idReclamoTipo });
            if (result.affectedRows > 0) {
                res.status(201).json({ id: result.insertId, nombre, idReclamoTipo});
            } else {
                res.status(500).json({ error: "No se pudo crear la oficina" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar la oficina' });
        }
    };

    deleteOficina = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.oficinasService.deleteOficina(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Oficina no encontrada' });
            }
            res.status(200).json({ message: 'Oficina eliminada correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la oficina' });
        }
    };

    updateOficina = async (req, res) => {
        try{
            const { id } = req.params;
            const campos = req.body;
            const result = await this.oficinasService.updateOficina(id, campos);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "No se pudo modificar."    
                })
            }
            
            res.status(200).json({
                mensaje: "Oficina modificada"
            });

        }catch(error){
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    };

    addEmpleadoOficina = async (req, res) => {
        const { id } = req.params;
        const { idEmpleado } = req.body;
        try {
            const result = await this.oficinasService.addEmpleadoOficina(id, idEmpleado);
            if (result.affectedRows > 0) {
                res.status(201).json({ mensaje: 'Empleado agregado a la oficina'});
            } else {
                res.status(500).json({ error: "No se pudo agregar el empleado a la oficina" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar a la oficina' });
        }
    };

    deleteEmpleadoOficina = async (req, res) => {
        const { id } = req.params;
        const { idEmpleado } = req.body;
        try {
            const result = await this.oficinasService.deleteEmpleadoOficina(id, idEmpleado);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'No se pudo eliminar el empleado de la oficina' });
            }
            res.status(200).json({ message: 'Empleado eliminado de la oficina' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar de la oficina' });
        }
    };
}