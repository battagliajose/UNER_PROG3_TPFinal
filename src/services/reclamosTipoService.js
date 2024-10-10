import ReclamosTipoDatabase from '../database/reclamosTipoDatabase.js';

export default class ReclamosTipoService {
    constructor() {
        this.reclamosTipoDatabase = new ReclamosTipoDatabase();
    }

    /**
     * Obtiene todos los tipos de reclamos.
     * @returns {Promise<Array>} Lista de tipos de reclamos.
     */
    getReclamosTipo = async () => {
        return this.reclamosTipoDatabase.getReclamosTipo();
    }

    /**
     * Obtiene un tipos de reclamos por su ID.
     * @param {number} id - ID del tipos de reclamos.
     * @returns {Promise<Object|null>} tipos de reclamos o null si no se encuentra.
     */
    getReclamosTipoById = async (id) => {
        return this.reclamosTipoDatabase.getReclamosTipoById(id);
    }

    /**
     * Agrega un nuevo tipos de reclamos.
     * @param {Object} nuevoReclamosTipo - Datos del nuevo tipos de reclamos.
     * @returns {Promise<Object>} Resultado de la operación.
     */
    addReclamosTipo = async (nuevoReclamosTipo) => {
        return this.reclamosTipoDatabase.addReclamosTipo(nuevoReclamosTipo);
    }

    /**
     * Elimina un tipos de reclamos por su ID.
     * @param {number} id - ID del tipos de reclamos a eliminar.
     * @returns {Promise<Object>} Resultado de la operación.
     */
    deleteReclamosTipo = async (id) => {
        return this.reclamosTipoDatabase.deleteReclamosTipo(id);
    }

    /**
     * Actualiza un tipos de reclamos.
     * @param {number} id - ID del tipos de reclamos a actualizar.
     * @param {Object} reclamosTipo - Nuevos datos para el tipos de reclamos.
     * @returns {Promise<Object>} Resultado de la operación.
     */
    updateReclamosTipo = async (id, reclamosTipo) => {
        return this.reclamosTipoDatabase.updateReclamosTipo(id, reclamosTipo);
    }
}
