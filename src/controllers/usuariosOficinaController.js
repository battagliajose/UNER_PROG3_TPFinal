import usuariosOficinaService from '../services/usuariosOficinaService.js';

export default class usuariosOficinaController {

    constructor () {
        this.usuariosOficinaService = new usuariosOficinaService();
    }

    getUsuariosOficina = async (req, res) => {
        try {
            const result = await this.usuariosOficinaService.getUsuariosOficina();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener las oficinas' });
        }
    }

    getUsuariosOficinaId = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.usuariosOficinaService.getUsuariosOficinaId(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Oficina no encontrada' });
            }
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener la oficina' });
        }
    };

    addUsuariosOficina = async (req, res) => {
        const { idUsuario, idOficina ,activo } = req.body;
        try {
            const result = await this.usuariosOficinaService.addUsuariosOficina({idUsuario, idOficina ,activo});
            if (result.affectedRows > 0) {
                res.status(201).json({ id: result.insertId, idUsuario, idOficina ,activo });
            } else {
                res.status(500).json({ error: "No se pudo crear la oficina" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar la oficina' });
        }
    };

    deleteUsuariosOficina = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.usuariosOficinaService.deleteUsuariosOficina(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Oficina no encontrada' });
            }
            res.status(200).json({ message: 'Oficina eliminada correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la oficina' });
        }
    };

    updateUsuariosOficina = async (req, res) => {
        try {
            const { id } = req.params;
            const campos = req.body;
            const result = await this.usuariosOficinaService.updateUsuariosOficina(id, campos);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "No se pudo modificar la oficina."    
                });
            }
            
            res.status(200).json({
                mensaje: "Oficina modificada"
            });

        } catch (error) {
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    };
}