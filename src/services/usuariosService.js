import UserTypes from "../config/userTypes.js";
import UsuariosDataBase from "../database/usuariosDatabase.js";
import crypto from 'crypto';

export default class UsuariosDatabase {
    constructor() {
        this.usuariosDatabase = new UsuariosDataBase();
    }
    
    getUsuarios = async (usuario) => {
        //Si es CLIENTE
        if (usuario.idUsuarioTipo===UserTypes.CLIENTE){
           
            return this.usuariosDatabase.getUsuarioById(usuario.idUsuario);
        }else{
            //Si es ADMIN
            return this.usuariosDatabase.getUsuarios();
        }
    }

    getUsuarioById = async (id) => {
        return this.usuariosDatabase.getUsuarioById(id);
    };

    getUsuarioByName = async (nombre) => {
        return this.usuariosDatabase.getUsuarioByName(nombre);
    };

    getOficinasUsuarioById = async (id) => {
        return this.usuariosDatabase.getOficinasUsuarioById(id);
    };

    addUsuario = async (nuevoUsuario) => {
        return this.usuariosDatabase.addUsuario(nuevoUsuario);
    };

    deleteUsuario = async (id) => {
        return this.usuariosDatabase.deleteUsuario(id);
    };

    updateUsuario = async (usuario, id = null, campos) => {
        //Control de modificacion si campos viene con contraseñia
        if(campos.contrasenia) {
            campos.contrasenia = await this.hashPassword(campos.contrasenia);
            console.log(campos.contrasenia);
        }        
        
        // Si es admin puede modificar cualquier dato de cualquier usuario
        if (usuario.idUsuarioTipo === 1 && id != null) {
            return this.usuariosDatabase.updateUsuario(id, campos);
        }
        
        // Cualquier otro tipo de usuario solo puede modificar su nombre, apellido, correoElectronico, contrasenia o imagen.
        const camposFiltrados = this.filtrarCampos(campos);
        return this.usuariosDatabase.updateUsuario(usuario.idUsuario, camposFiltrados);
    };

    validateUsuarioByMail = async (correoElectronico, contrasenia) => {
        return this.usuariosDatabase.validateUsuarioByMail(correoElectronico, contrasenia);
    }; 

    hashPassword = async (contrasenia) => {       
        return await crypto.createHash('sha256').update(contrasenia).digest('hex');
    };

    filtrarCampos (campos) {
        const camposPermitidos = {
            nombre: null,
            apellido: null,
            correoElectronico: null,
            contrasenia: null,
            imagen: null
        };

        const camposFiltrados = {};

        for (const clave in camposPermitidos) {
            if (campos.hasOwnProperty(clave)) {
                camposFiltrados[clave] = campos[clave];
            }
          }
        
        return camposFiltrados;
    }

}