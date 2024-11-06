import { pool } from './connectionMySql.js';

export default class OficinasDatabase {
    getOficinas = async () => {
        try {
            const query = `SELECT o.idOficina, o.nombre, o.idReclamoTipo, rt.descripcion as ReclamoTipo, o.activo FROM oficinas as o
                            INNER JOIN reclamos_tipo as rt ON o.idReclamoTipo = rt.idReclamoTipo
                            WHERE o.activo`;
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getOficinaById = async (id) => {
        try {
            const query = `SELECT o.idOficina, o.nombre, o.idReclamoTipo, rt.descripcion as ReclamoTipo, o.activo FROM oficinas as o
                            INNER JOIN reclamos_tipo as rt ON o.idReclamoTipo = rt.idReclamoTipo
                            WHERE idOficina = ?`;
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    addOficina = async (nuevaOficina) => {
        const { nombre, idReclamoTipo } = nuevaOficina;
        try {
            const query = 'INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?, ?, 1)';
            const [result] = await pool.query(query, [nombre, idReclamoTipo]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    deleteOficina = async (id) => {
        try {
            const query = 'UPDATE oficinas SET activo = 0 WHERE idOficina = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    updateOficina = async (id, oficina) => {
        const campos = Object.keys(oficina);
        const valores = campos.map((campo) => oficina[campo]);
        const consulta = `UPDATE oficinas SET ${campos
        .map((campo) => `${campo} = ?`)
        .join(", ")} WHERE idOficina = ?`;
    
        try {
            const [result] = await pool.query(consulta, [...valores, id]);
            if (result.affectedRows > 0) {
                const [oficinaActualizada] = await pool.query(
                "SELECT * FROM oficinas WHERE idOficina = ?",
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

    addEmpleadoOficina = async (idOficina, idEmpleado) => {
        try {
            const query = 'INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?, ?, 1)';
            const [result] = await pool.query(query, [idEmpleado, idOficina]);
            return result;
        } catch (error) {
            console.error("Error al agregar empleado a la oficina: ", error);
            throw error;
        }
    };

    deleteEmpleadoOficina = async (idOficina, idEmpleado) => {
        try {
            const query = 'UPDATE usuarios_oficinas SET activo = 0 WHERE  idOficina = ? and  idUsuario = ?';
            const [result] = await pool.query(query, [idOficina, idEmpleado]);
            return result;
        } catch (error) {
            console.error("Error al agregar empleado a la oficina: ", error);
            throw error;
        }
    };
}