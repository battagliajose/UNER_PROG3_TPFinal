import ReclamosDatabase from "../database/reclamosDatabase.js";
import MailService from "./mailService.js";
import UsuariosService from "./usuariosService.js";
import OficinasServices from "./oficinasService.js";

export default class ReclamosService {

    constructor() {
        this.reclamosDatabase = new ReclamosDatabase();
    }

    getReclamos = async (usuario) => {
        if (usuario.idUsuarioTipo === 1) { // ADMIN
            // Devuelve todos los reclamos
            return this.reclamosDatabase.getReclamos();
        }

        if (usuario.idUsuarioTipo === 2) { // EMPLEADO
            // Devuelve solo los reclamos de las oficinas del empleado
            const usuariosService = new UsuariosService();

            const oficinas = await usuariosService.getOficinasUsuarioById(usuario.idUsuario);
            let reclamos = [];

            for (const oficina of oficinas) {
                const reclamosOficina = await this.reclamosDatabase.getReclamosByTipo(oficina.idReclamoTipo);
                reclamos = reclamos.concat(reclamosOficina);
            }

            return reclamos;
        }

        if (usuario.idUsuarioTipo === 3) { // CLIENTE
            // Devuelve los reclamos del usuario
            return this.reclamosDatabase.getReclamosByUser(usuario);
        }

        return {affectedRows: 0};
    }

    getReclamoById = async (id) => {
        return this.reclamosDatabase.getReclamoById(id);
    };

    addReclamo = async (nuevoReclamo) => {
        return this.reclamosDatabase.addReclamo(nuevoReclamo);
    };

    updateReclamo = async (id, reclamo) => {
        const reclamoOriginal = await this.reclamosDatabase.getReclamoById(id);
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

    cancelReclamo = async (usuario, id) => {
        const reclamo = await this.reclamosDatabase.getReclamoById(id);

        if (reclamo.idUsuarioCreador === usuario.idUsuario && reclamo.idReclamoEstado === 1) {
            return await this.updateReclamo(id, { idReclamoEstado : 3 })
        }

        return {affectedRows: 0};
    }

    cambiarEstadoReclamo = async (usuario, id, idReclamoEstado) => {
        const usuariosService = new UsuariosService();
        const oficinasService = new OficinasServices();
        
        const reclamo = await this.reclamosDatabase.getReclamoById(id);
        const oficinas = await usuariosService.getOficinasUsuarioById(usuario.idUsuario);
        let flagTipoReclamo = false;

        // Busca en las oficinas del usuario empleado, si alguna atiende el tipo de Reclamo del reclamo
        // al que se le quiere cambiar el estado, en caso de encontrarlo setea el flagTipoReclamo.
        for (const oficina of oficinas) { //reemplazar con ForEach?
            if (oficina.idReclamoTipo === reclamo.idReclamoTipo){
                flagTipoReclamo = true;
                break;
            }
        };

        if (flagTipoReclamo) {
            if (usuario.idUsuarioTipo === 2) {
                return await this.updateReclamo(id, { idReclamoEstado })
            }
        }
        
        return {affectedRows: 0};
    }

    getEstadisticas = async () => {
        return this.reclamosDatabase.getEstadisticas();
    };
    

}