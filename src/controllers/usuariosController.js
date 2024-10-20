import UsuariosService from '../services/usuariosService.js'

export default class UsuariosController {

    constructor() {
        this.usuariosService = new UsuariosService();
    }
    
    getUsuarios = async (req, res) => {
        try {
            const result = await this.usuariosService.getUsuarios();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
    }

    getUsuarioById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.usuariosService.getUsuarioById(id);
            const oficinas = await this.usuariosService.getOficinasUsuarioById(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json({...result[0], oficinas : oficinas || []});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    };

    getOficinasUsuarioById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.usuariosService.getOficinasUsuarioById(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Oficinas del Usuario no encontradas' });
            }
            res.status(200).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las oficinas del usuario' });
        }
    };

    addUsuario = async (req, res) => {
        const {nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo} = req.body;
        try {
            const result = await this.usuariosService.addUsuario({nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo});
            res.status(201).json({ id: result.insertId, nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el usuario' });
        }
    };

    deleteUsuario = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.usuariosService.deleteUsuario(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    };

    updateUsuario = async (req, res) => {
        try{
            const { id } = req.params;
            const campos = req.body;
            const result = await this.usuariosService.updateUsuario(id, campos);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "No se pudo modificar."    
                })
            }
            
            res.status(200).json({
                mensaje: "Usuario modificado"
            });

        }catch(error){
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    };

}