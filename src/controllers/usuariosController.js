import UsuariosService from '../services/usuariosService.js'

export default class UsuariosController {

    constructor() {
        this.usuariosService = new UsuariosService();
    }
    
    getUsuarios = async (req, res) => {
        const usuario = req.user;
        try {
            const result = await this.usuariosService.getUsuarios(usuario);
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
            res.status(200).json({...result, oficinas : oficinas || []});
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

    addEmpleado = async (req, res) => {
        const {nombre, apellido, correoElectronico, contrasenia} = req.body;
        const idUsuarioTipo = 2;
        const activo = 1;
        const imagen = req.file ? req.file.filename : null;
       
        try {
    
            const result = await this.usuariosService.addUsuario({nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo});
            res.status(201).json({ id: result.id, nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el usuario' });
        }
    };

    registrarCliente = async (req, res) => {
        const {nombre, apellido, correoElectronico, contrasenia} = req.body;
        const idUsuarioTipo = 3;
        const activo = 1;
        const imagen = req.file ? req.file.filename : null;

        try {
            const result = await this.usuariosService.addUsuario({nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo});
            res.status(201).json({ id: result.insertId, nombre, apellido, correoElectronico, idUsuarioTipo, imagen, activo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el usuario' });
        }
    }

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
            const usuario = req.user;
            const img = req.file ? req.file.filename : null;
            
            //usuario id
            let UsuarioID;
           
            if(!id){
                UsuarioID=usuario.idUsuario        
            }else{
                UsuarioID=id;
            }
            // agrego la imagen a la variable
            campos.imagen = img;
            
            const result = await this.usuariosService.updateUsuario(usuario, UsuarioID, campos);


            if (result.affectedRows === 0) {
                
                if (result.msg=="UsuarioTipoCliente"){

                    return res.status(401).json({
                      mesaje: "Un administrador no esta autorizado a modificar a un CLIENTE."  
                    })
                }            
                return res.status(404).json({
                    mensaje: "No se pudo modificar." 
                })
               
            }



            res.status(200).json({
                mensaje: "Usuario modificado"
            });

        }catch(error){
            console.log(error);
            res.status(500).json({
                mensaje: "Error interno."
            })
        }
    };

}