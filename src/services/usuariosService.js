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
        // ****Ver como filtrar los campos permitidos para modificar según usuario***
        if (usuario.idUsuarioTipo === 3) 
            return this.usuariosDatabase.updateUsuario(usuario.idUsuario, campos);

        if (this.usuariosDatabase.incudes('contrasenia')){
            console.log("quieren cambiar la contraseña");
        }

        return this.usuariosDatabase.updateUsuario(id, campos);
    };

    validateUsuarioByMail = async (correoElectronico, contrasenia) => {
        return this.usuariosDatabase.validateUsuarioByMail(correoElectronico, contrasenia);
    }; 

}