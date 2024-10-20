import UsuariosDataBase from "../database/usuariosDatabase.js";

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

    getOficinasUsuarioById = async (id) => {
        return this.usuariosDatabase.getOficinasUsuarioById(id);
    };

    addUsuario = async (nuevoUsuario) => {
        return this.usuariosDatabase.addUsuario(nuevoUsuario);
    };

    deleteUsuario = async (id) => {
        return this.usuariosDatabase.deleteUsuario(id);
    };

    updateUsuario = async (id, usuario) => {
        return this.usuariosDatabase.updateUsuario(id, usuario);
    };

    validateUsuarioByMail = async (correoElectronico, contrasenia) => {
        return this.usuariosDatabase.validateUsuarioByMail(correoElectronico, contrasenia);
    }; 

}