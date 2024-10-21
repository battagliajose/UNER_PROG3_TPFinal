import ReclamosDatabase from "../database/reclamosDatabase.js";
import MailService from "./mailService.js";
import UsuariosService from "./usuariosService.js";

export default class ReclamosService {

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

    updateReclamo = async (id, reclamo) => {
        const [reclamoOriginal] = await this.reclamosDatabase.getReclamoById(id); //Ver porque devuelve array.
        const reclamoModificado = await this.reclamosDatabase.updateReclamo(id, reclamo);

        if (reclamoOriginal.EstadoReclamo != null && reclamoModificado.EstadoReclamo != null) {
            if (reclamoOriginal.EstadoReclamo != reclamoModificado.EstadoReclamo) {
                const mailService = new MailService();
                const usuariosService = new UsuariosService();

                const usuario = await usuariosService.getUsuarioByName(reclamoModificado.CreadorUsuario);
                await mailService.enviarMail(reclamoModificado, usuario.correoElectronico);
            };
        }

        return reclamoModificado
    };
}