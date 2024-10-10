import ReclamosEstadoDatabase from '../database/reclamosEstadoDatabase.js';

export default class ReclamosEstadoService {
    constructor() {
        this.reclamosEstadoDatabase = new ReclamosEstadoDatabase();
    }

    /**
     * Obtiene todos los reclamos de estado.
     * @returns {Promise<Array>} Lista de reclamos de estado.
     */
    getReclamosEstado = async () => {
        return this.reclamosEstadoDatabase.getReclamosEstado();
    }

    /**
     * Obtiene un reclamo de estado por su ID.
     * @param {number} id - ID del reclamo de estado.
     * @returns {Promise<Object|null>} Reclamo de estado o null si no se encuentra.
     */
    getReclamosEstadoById = async (id) => {
        return this.reclamosEstadoDatabase.getReclamosEstadoById(id);
    }

    /**
     * Agrega un nuevo reclamo de estado.
     * @param {Object} nuevoReclamosEstado - Datos del nuevo reclamo de estado.
     * @returns {Promise<Object>} Resultado de la operación.
     */
    addReclamosEstado = async (nuevoReclamosEstado) => {
        return this.reclamosEstadoDatabase.addReclamosEstado(nuevoReclamosEstado);
    }

    /**
     * Elimina un reclamo de estado por su ID.
     * @param {number} id - ID del reclamo de estado a eliminar.
     * @returns {Promise<Object>} Resultado de la operación.
     */
    deleteReclamosEstado = async (id) => {
        return this.reclamosEstadoDatabase.deleteReclamosEstado(id);
    }

    /**
     * Actualiza un reclamo de estado.
     * @param {number} id - ID del reclamo de estado a actualizar.
     * @param {Object} reclamosEstado - Nuevos datos para el reclamo de estado.
     * @returns {Promise<Object>} Resultado de la operación.
     */
    updateReclamosEstado = async (id, reclamosEstado) => {
        return this.reclamosEstadoDatabase.updateReclamosEstado(id, reclamosEstado);
    }
}
