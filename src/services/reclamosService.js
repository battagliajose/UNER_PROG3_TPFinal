import ReclamosDatabase from "../database/reclamosDatabase.js";
import MailService from "./mailService.js";
import UsuariosService from "./usuariosService.js";
import InformeService from "./informesService.js";


export default class ReclamosService {

    constructor() {
        this.reclamosDatabase = new ReclamosDatabase();
        this.informes = new InformeService();
        this.reclamos = this.reclamosDatabase;
    }
    

    getReclamos = async (limit, offset, usuario) => {
        if (usuario.idUsuarioTipo === 1) { // ADMIN
            // Devuelve todos los reclamos
            return this.reclamosDatabase.getReclamos(limit, offset);
        }

        if (usuario.idUsuarioTipo === 2) { // EMPLEADO
            // Devuelve solo los reclamos de las oficinas del empleado
            const usuariosService = new UsuariosService();

            const oficinas = await usuariosService.getOficinasUsuarioById(usuario.idUsuario);
            let reclamos = [];

            for (const oficina of oficinas) {
                const reclamosOficina = await this.reclamosDatabase.getReclamosByTipo(limit, offset, oficina.idReclamoTipo);
                reclamos = reclamos.concat(reclamosOficina);
            }

            return reclamos;
        }

        if (usuario.idUsuarioTipo === 3) { // CLIENTE
            // Devuelve los reclamos del usuario
            return this.reclamosDatabase.getReclamosByUser(limit, offset, usuario);
        }

        return {affectedRows: 0};
    }

    getReclamoById = async (usuario, id) => {
        const reclamo = await this.reclamosDatabase.getReclamoById(id);
        if (usuario.idUsuarioTipo != 1 && reclamo.idUsuarioCreador != usuario.idUsuario) {
            // Si no es admin y no es el creador del reclamo no lo retorna
            return { length: 0 };
        }
        return reclamo;
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
            const fechaActual = new Date();
            return await this.updateReclamo(id, { 
                idReclamoEstado : 3,
                fechaCancelado: fechaActual,
                fechaFinalizado: fechaActual,
                idUsuarioFinalizador: usuario.idUsuario })
        }

        return {affectedRows: 0};
    }

    cambiarEstadoReclamo = async (usuario, id, idReclamoEstado) => {
        const usuariosService = new UsuariosService();
        
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
    };

    //service para generar informe
    generarInforme = async (formato) => {
        if (formato === 'pdf') {

            return await this.reportePdf();

        }else if (formato === 'csv'){
            
            return await this.reporteCsv();

        }
    }

    reportePdf = async () => {
        const datosReporte = await this.reclamos.buscarDatosReportePdf();

        if (!datosReporte || datosReporte.length === 0) {
            return { estado: false, mensaje: 'Sin datos para el reporte'};
        }

        const pdf = await this.informes.informeReclamosPdf(datosReporte);
        
        return {
            buffer: pdf,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="reporte.pdf"'
            }
        };
    }

    reporteCsv = async () => {
        const datosReporte = await this.reclamos.buscarDatosReporteCsv();

        if (!datosReporte || datosReporte.length === 0) {
            return {estado: false, mensaje: 'Sin datos para el reporte'};
        }

        const csv =  await this.informes.informeReclamosCsv(datosReporte);
        return {
            path: csv,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="reporte.csv"'
            }
        };
    }



    getEstadisticas = async () => {
        return this.reclamosDatabase.getEstadisticas();
    };
    

}