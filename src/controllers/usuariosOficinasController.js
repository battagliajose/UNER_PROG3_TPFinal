import UsuariosOficinasService from '../services/usuariosOficinasService.js';

export default class usuariosOficinasController {

    constructor () {
        this.usuariosOficinasService = new UsuariosOficinasService();
    }

    getUsuariosOficinas = async (req, res) => {
        try {
            const result = await this.usuariosOficinasService.getUsuariosOficinas();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener las oficinas' });
        }
    }

    getUsuariosOficinasId = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.usuariosOficinasService.getUsuariosOficinasId(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Oficina no encontrada' });
            }
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener la oficina' });
        }
    };

    addUsuariosOficinas = async (req, res) => {
        const { idUsuario, idOficina ,activo } = req.body;
        try {
            const result = await this.usuariosOficinasService.addUsuariosOficinas({idUsuario, idOficina ,activo});
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

    deleteUsuariosOficinas = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.usuariosOficinasService.deleteUsuariosOficinas(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Oficina no encontrada' });
            }
            res.status(200).json({ message: 'Oficina eliminada correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la oficina' });
        }
    };

    updateUsuariosOficinas = async (req, res) => {
        try {
            const { id } = req.params;
            const campos = req.body;
            const result = await this.usuariosOficinasService.updateUsuariosOficinas(id, campos);

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