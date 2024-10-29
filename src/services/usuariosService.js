import UsuariosDataBase from "../database/usuariosDatabase.js";
import crypto from 'crypto';

export default class UsuariosDatabase {
    constructor() {
        this.usuariosDatabase = new UsuariosDataBase();
    }
    
    getUsuarios = async () => {
        return this.usuariosDatabase.getUsuarios();
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

    updateUsuario = async (usuario, id, campos) => {
        //Control de modificacion si campos viene con contraseñia
        if(campos.contrasenia){
            campos.contrasenia=this.hashPassword(campos.contrasenia);
        }        
        // ****Ver como filtrar los campos permitidos para modificar según usuario***
        if (usuario.idUsuarioTipo === 3) 
            return this.usuariosDatabase.updateUsuario(usuario.idUsuario, campos);
           
                 
        return this.usuariosDatabase.updateUsuario(id, campos);
    };

    validateUsuarioByMail = async (correoElectronico, contrasenia) => {
        return this.usuariosDatabase.validateUsuarioByMail(correoElectronico, contrasenia);
    }; 

    hashPassword =async (contrasenia) => {       
        return await crypto.createHash('sha256').update(contrasenia).digest('hex');
    };

}