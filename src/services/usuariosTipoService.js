import usuariosTipoDatabase from "../database/usuariosTipoDatabase.js";

export default class usuariosTipoService {

    constructor() {
        this.usuariosTipoDatabase = new usuariosTipoDatabase();
    }

    /**
     * Obtiene todos los tipos de usuarios.
     * @returns {Promise<Array>} Lista de tipos de usuarios.
     */
    getUsuariosTipo = async () => {
       return this.usuariosTipoDatabase.getUsuariosTipo();
    }

    /**
     * Obtiene un tipo de usuario por su ID.
     * @param {number} id - ID del tipo de usuario.
     * @returns {Promise<Object>} Tipo de usuario correspondiente al ID.
     */
    getUsuariosTipoId = async (id) => {
        return this.usuariosTipoDatabase.getUsuariosTipoId(id);
    };

    /**
     * Agrega un nuevo tipo de usuario.
     * @param {Object} nuevoTipoUsuario - Objeto que contiene la descripción y estado del tipo de usuario.
     * @returns {Promise<Object>} Resultado de la operación de inserción.
     */
    addUsuariosTipo = async (nuevoTipoUsuario) => {
        return this.usuariosTipoDatabase.addUsuariosTipo(nuevoTipoUsuario);
    };

    /**
     * Elimina un tipo de usuario por su ID.
     * @param {number} id - ID del tipo de usuario a eliminar.
     * @returns {Promise<Object>} Resultado de la operación de eliminación.
     */
    deleteUsuariosTipo = async (id) => {
        return this.usuariosTipoDatabase.deleteUsuariosTipo(id);
    };

    /**
     * Actualiza un tipo de usuario por su ID.
     * @param {number} id - ID del tipo de usuario a actualizar.
     * @param {Object} usuariosTipo - Objeto que contiene los campos a actualizar.
     * @returns {Promise<Object>} Resultado de la operación de actualización.
     */
    updateUsuariosTipo = async (id, usuariosTipo) => {
        return this.usuariosTipoDatabase.updateUsuariosTipo(id, usuariosTipo);
    };
}