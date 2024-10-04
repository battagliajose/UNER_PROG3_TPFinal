import OficinasDatabase from "../database/oficinasDatabase.js";

export default class OficinasServices {

    constructor() {
        this.oficinasDatabase = new OficinasDatabase();
    }

    getOficinas = async () => {
       return this.oficinasDatabase.getOficinas();
    }

    getOficinaById = async (id) => {
        return this.oficinasDatabase.getOficinaById(id);
    };

    addOficina = async (nuevaOficina) => {
        return this.oficinasDatabase.addOficina(nuevaOficina);
    };

    deleteOficina = async (id) => {
        return this.oficinasDatabase.deleteOficina(id);
    };

    updateOficina = async (id, oficina) => {
        return this.oficinasDatabase.updateOficina(id, oficina);
    };
}