import { pool } from './connectionMySql.js';

export default class UsuariosOficinasDatabase {
    getUsuariosOficinas = async () => {
        try {
            const query = `SELECT 
                        uo.idUsuarioOficina, u.nombre, o.nombre AS nombreOficina, uo.activo FROM usuarios_oficinas AS uo 
                        INNER JOIN  usuarios u ON uo.idUsuario = u.idUsuario 
                        INNER JOIN  oficinas o ON uo.idOficina = o.idOficina 
                        WHERE  u.activo`;
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getUsuariosOficinasId = async (id) => {
        try {
            const query = `SELECT 
                        uo.idUsuarioOficina, u.nombre, o.nombre AS nombreOficina, uo.activo FROM usuarios_oficinas AS uo 
                        INNER JOIN  usuarios u ON uo.idUsuario = u.idUsuario 
                        INNER JOIN  oficinas o ON uo.idOficina = o.idOficina 
                        WHERE 
                        uo.idUsuarioOficina = ?;`
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    addUsuariosOficinas = async (nuevoUsuarioOficina) => {
        const { idUsuario, idOficina ,activo } = nuevoUsuarioOficina;
        try {
            const query = 'INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?, ?, ?)';
            const [result] = await pool.query(query, [idUsuario,idOficina, activo]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    deleteUsuariosOficinas = async (id) => {
        try {
            const query = 'UPDATE usuarios_oficinas SET activo = 0 WHERE idUsuarioOficina = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    updateUsuariosOficinas = async (id, usuariosOficina) => {
        const campos = Object.keys(usuariosOficina);
        const valores = campos.map((campo) => usuariosOficina[campo]);
        const consulta = `UPDATE usuarios_oficinas SET ${campos
        .map((campo) => `${campo} = ?`)
        .join(", ")} WHERE idUsuarioOficina = ?`;
    
        try {
            const [result] = await pool.query(consulta, [...valores, id]);
            if (result.affectedRows > 0) {
                const [oficinaActualizada] = await pool.query(
                "SELECT * FROM usuarios_oficinas WHERE idUsuarioOficina = ?",
                [id]
                );
                return oficinaActualizada[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error al actualizar la relación usuario-oficina:", error);
            throw error;
        }
    };
}