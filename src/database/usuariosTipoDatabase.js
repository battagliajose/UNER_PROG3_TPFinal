import { pool } from './connectionMySql.js';

export default class UsuariosTipoDatabase {
    /**
     * Obtiene todos los tipos de usuarios activos.
     * @returns {Promise<Array>} Lista de tipos de usuarios.
     */
    getUsuariosTipo = async () => {
        try {
            const query = 'SELECT idUsuarioTipo, descripcion, activo FROM usuarios_Tipo WHERE activo';
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Obtiene un tipo de usuario por su ID.
     * @param {number} id - ID del tipo de usuario.
     * @returns {Promise<Object>} Tipo de usuario correspondiente al ID.
     */
    getUsuariosTipoId = async (id) => {
        try {
            const query = 'SELECT idUsuarioTipo, descripcion, activo FROM usuarios_Tipo WHERE idUsuarioTipo = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Agrega un nuevo tipo de usuario.
     * @param {Object} nuevaUsuarioTipo - Objeto que contiene la descripción y estado del tipo de usuario.
     * @returns {Promise<Object>} Resultado de la operación de inserción.
     */
    addUsuariosTipo = async (nuevaUsuarioTipo) => {
        const { descripcion, activo } = nuevaUsuarioTipo;
        try {
            const query = 'INSERT INTO usuarios_Tipo (descripcion, activo) VALUES (?, ?)';
            const [result] = await pool.query(query, [descripcion, activo]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Elimina un tipo de usuario por su ID (marcando como inactivo).
     * @param {number} id - ID del tipo de usuario a eliminar.
     * @returns {Promise<Object>} Resultado de la operación de eliminación.
     */
    deleteUsuariosTipo = async (id) => {
        try {
            const query = 'UPDATE usuarios_Tipo SET activo = 0 WHERE idUsuariosTipo = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Actualiza un tipo de usuario por su ID.
     * @param {number} id - ID del tipo de usuario a actualizar.
     * @param {Object} usuariosTipo - Objeto que contiene los campos a actualizar.
     * @returns {Promise<Object>} Resultado de la operación de actualización.
     */
    updateUsuariosTipo = async (id, usuariosTipo) => {
        const campos = Object.keys(usuariosTipo);
        const valores = campos.map((campo) => usuariosTipo[campo]);
        const consulta = `UPDATE usuarios_Tipo SET ${campos
        .map((campo) => `${campo} = ?`)
        .join(", ")} WHERE idUsuariosTipo = ?`;
    
        try {
            const [result] = await pool.query(consulta, [...valores, id]);
            if (result.affectedRows > 0) {
                const [usuariosTipoActualizado] = await pool.query(
                "SELECT * FROM usuarios_Tipo WHERE idUsuariosTipo = ?",
                [id]
                );
                return usuariosTipoActualizado[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error al actualizar el tipo de usuario:", error);
            throw error;
        }
    };
}