import UsuariosOficinasDatabase from "../database/usuariosOficinasDatabase.js";

export default class UsuariosOficinasService {

    constructor() {
        this.usuariosOficinasDatabase = new UsuariosOficinasDatabase();
    }

    getUsuariosOficinas = async () => {
        return this.usuariosOficinasDatabase.getUsuariosOficinas();
    }

    getUsuariosOficinasId = async (id) => {
        return this.usuariosOficinasDatabase.getUsuariosOficinasId(id);
    };

    addUsuariosOficinas = async (nuevoUsuarioOficina) => {
        return this.usuariosOficinasDatabase.addUsuariosOficinas(nuevoUsuarioOficina);
    };

    deleteUsuariosOficinas = async (id) => {
        return this.usuariosOficinasDatabase.deleteUsuariosOficinas(id);
    };

    updateUsuariosOficinas = async (id, UsuarioOficina) => {
        return this.usuariosOficinasDatabase.updateUsuariosOficinas(id, UsuarioOficina);
    };
}