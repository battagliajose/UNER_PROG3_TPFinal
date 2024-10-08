import ReclamosDatabase from "../database/reclamosDatabase.js";

export default class ReclamosService {

    constructor() {
        this.reclamosDatabase = new ReclamosDatabase();
    }

    getAllReclamos = async () => {
        return this.reclamosDatabase.getAllReclamos();
    }

    getReclamoById = async (id) => {
        return this.reclamosDatabase.getReclamoById(id);
    };

    createReclamo = async (nuevoReclamo) => {
        return this.reclamosDatabase.createReclamo(nuevoReclamo);
    };

    deleteReclamo = async (id) => {
        return this.reclamosDatabase.deleteReclamo(id);
    };

    updateReclamo = async (id, reclamo) => {
        return this.reclamosDatabase.updateReclamo(id, reclamo);
    };
}