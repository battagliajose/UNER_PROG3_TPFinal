import usuariosOficinaDatabase from "../database/usuariosOficinaDatabase.js";

export default class usuariosOficinaService {

    constructor() {
        this.usuariosOficinaDatabase = new usuariosOficinaDatabase();
    }

    getUsuariosOficina = async () => {
        return this.usuariosOficinaDatabase.getUsuariosOficina();
    }

    getUsuariosOficinaId = async (id) => {
        return this.usuariosOficinaDatabase.getUsuariosOficinaId(id);
    };

    addUsuariosOficina = async (nuevoUsuarioOficina) => {
        return this.usuariosOficinaDatabase.addUsuariosOficina(nuevoUsuarioOficina);
    };

    deleteUsuariosOficina = async (id) => {
        return this.usuariosOficinaDatabase.deleteUsuariosOficina(id);
    };

    updateUsuariosOficina = async (id, UsuarioOficina) => {
        return this.usuariosOficinaDatabase.updateUsuariosOficina(id, UsuarioOficina);
    };
}