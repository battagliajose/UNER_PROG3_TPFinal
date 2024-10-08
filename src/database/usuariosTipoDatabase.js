import { pool } from './connectionMySql.js';

export default class UsuariosTipoDatabase {
    
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
                "SELECT * FROM usuariosTipo WHERE idUsuariosTipo = ?",
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