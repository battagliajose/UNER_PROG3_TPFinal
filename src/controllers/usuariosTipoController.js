import usuariosTipoService from '../services/usuariosTipoService.js';

export default class usuariosTipoController {

    constructor () {
        this.usuariosTipoService = new usuariosTipoService();
    }

    /**
     * Maneja la solicitud para obtener todos los tipos de usuarios.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     */
    getUsuariosTipo = async (req, res) => {
        try {
            const result = await this.usuariosTipoService.getUsuariosTipo();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener los tipos de usuarios' });
        }
    }

    /**
     * Maneja la solicitud para obtener un tipo de usuario por ID.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     */
    getUsuariosTipoId = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.usuariosTipoService.getUsuariosTipoId(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Tipo de usuario no encontrado' });
            }
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el tipo de usuario' });
        }
    };

    /**
     * Maneja la solicitud para agregar un nuevo tipo de usuario.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     */
    addUsuariosTipo = async (req, res) => {
        const { descripcion, activo } = req.body;
        try {
            const result = await this.usuariosTipoService.addUsuariosTipo({descripcion, activo});
            if (result.affectedRows > 0) {
                res.status(201).json({ id: result.insertId, descripcion, activo });
            } else {
                res.status(500).json({ error: "No se pudo crear el tipo de usuario" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el tipo de usuario' });
        }
    };

    /**
     * Maneja la solicitud para eliminar un tipo de usuario por ID.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     */
    deleteUsuariosTipo = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.usuariosTipoService.deleteUsuariosTipo(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Tipo de usuarios no encontrado' });
            }
            res.status(200).json({ message: 'Tipo de usuario eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el tipo de usuario' });
        }
    };

    /**
     * Maneja la solicitud para actualizar un tipo de usuario por ID.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     */
    updateUsuariosTipo = async (req, res) => {
        try {
            const { id } = req.params;
            const campos = req.body;
            const result = await this.usuariosTipoService.updateUsuariosTipo(id, campos);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "No se pudo modificar el tipo de usuario."    
                });
            }
            
            res.status(200).json({
                mensaje: "Tipo de usuario modificado"
            });

        } catch (error) {
            res.status(500).json({
                mensaje: "Error interno."
            });
        }
    };
}