import { pool } from './connectionMySql.js';

export default class UsuariosOficinaDatabase {
    getUsuariosOficina = async () => {
        try {
            const query = 'SELECT idUsuario,idOficina, activo FROM usuarios_oficinas WHERE activo';
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getUsuariosOficinaId = async (id) => {
        try {
            const query = 'SELECT idUsuario, idOficina ,activo FROM usuarios_oficinas WHERE idOficina = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    addUsuariosOficina = async (nuevoUsuarioOficina) => {
        const { idUsuario, idOficina ,activo } = nuevoUsuarioOficina;
        try {
            const query = 'INSERT INTO usuarios_oficinas (idUsuario, idOficina ,activo) VALUES (?, ?, ?)';
            const [result] = await pool.query(query, [idUsuario,idOficina, activo]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    deleteUsuariosOficina = async (id) => {
        try {
            const query = 'UPDATE usuarios_oficinas SET activo = 0 WHERE idOficina = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    updateUsuariosOficina = async (id, usuariosOficina) => {
        const campos = Object.keys(usuariosOficina);
        const valores = campos.map((campo) => usuariosOficina[campo]);
        const consulta = `UPDATE usuarios_oficinas SET ${campos
        .map((campo) => `${campo} = ?`)
        .join(", ")} WHERE idOficina = ?`;
    
        try {
            const [result] = await pool.query(consulta, [...valores, id]);
            if (result.affectedRows > 0) {
                const [oficinaActualizada] = await pool.query(
                "SELECT * FROM usuarios_oficinas WHERE idOficina = ?",
                [id]
                );
                return oficinaActualizada[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error al actualizar la oficina:", error);
            throw error;
        }
    };
}