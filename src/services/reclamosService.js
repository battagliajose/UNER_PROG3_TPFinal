import ReclamosDatabase from "../database/reclamosDatabase.js";

export default class ReclamosServices {

    constructor() {
        this.reclamosDatabase = new ReclamosDatabase();
    }

    getReclamos = async () => {
       return this.reclamosDatabase.getReclamos();
    }

    getReclamoById = async (id) => {
        return this.reclamosDatabase.getReclamoById(id);
    };

    addReclamo = async (nuevoReclamo) => {
        return this.reclamosDatabase.addReclamo(nuevoReclamo);
    };

    deleteReclamo = async (id) => {
        return this.reclamosDatabase.deleteReclamo(id);
    };

    updateReclamo = async (id, Reclamo) => {
        return this.reclamosDatabase.updateReclamo(id, Reclamo);
    };
}