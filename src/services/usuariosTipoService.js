import usuariosTipoDatabase from "../database/usuariosTipoDatabase.js";

export default class usuariosTipoService {

    constructor() {
        this.usuariosTipoDatabase = new usuariosTipoDatabase();
    }
    
    getUsuariosTipo = async () => {
       return this.usuariosTipoDatabase.getUsuariosTipo();
    }
    
    getUsuariosTipoId = async (id) => {
        return this.usuariosTipoDatabase.getUsuariosTipoId(id);
    };
    
    addUsuariosTipo = async (nuevoTipoUsuario) => {
        return this.usuariosTipoDatabase.addUsuariosTipo(nuevoTipoUsuario);
    };
    
    deleteUsuariosTipo = async (id) => {
        return this.usuariosTipoDatabase.deleteUsuariosTipo(id);
    };
    
    updateUsuariosTipo = async (id, usuariosTipo) => {
        return this.usuariosTipoDatabase.updateUsuariosTipo(id, usuariosTipo);
    };
}