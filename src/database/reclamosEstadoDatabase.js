import { pool } from './connectionMySql.js';

export default class ReclamosEstadoDatabase {
    getReclamosEstado = async () => {
        try {
            const query = 'SELECT idReclamoEstado, descripcion, activo FROM reclamos_estado WHERE activo';
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getReclamosEstadoById = async (id) => {
        try {
            const query = 'SELECT idReclamoEstado, descripcion, activo FROM reclamos_estado WHERE idReclamoEstado = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    addReclamosEstado = async (nuevoReclamoEstado) => {
        const { descripcion, activo } = nuevoReclamoEstado;
        try {
            const query = 'INSERT INTO reclamos_estado (descripcion, activo) VALUES (?, ?)';
            const [result] = await pool.query(query, [descripcion, activo]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    deleteReclamosEstado = async (id) => {
        try {
            const query = 'UPDATE reclamos_estado SET activo = 0 WHERE idReclamoEstado = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    updateReclamosEstado = async (id, reclamoEstado) => {
        // Construir la consulta SQL para actualizar los campos específicos
        const consulta = `UPDATE reclamos_estado SET descripcion = ?, activo = ? WHERE idReclamoEstado = ?`;
        
        try {
            // Ejecutar la consulta con los valores correspondientes
            const [result] = await pool.query(consulta, [reclamoEstado.descripcion, reclamoEstado.activo, id]);
            
            // Verificar si se actualizó alguna fila
            if (result.affectedRows > 0) {
                // Si se actualizó, realizar una consulta para obtener el estado de reclamo actualizado
                const [reclamosEstadoActualizado] = await pool.query(
                    "SELECT * FROM reclamos_estado WHERE idReclamoEstado = ?",
                    [id]
                );
                return reclamosEstadoActualizado[0]; // Retornar el estado de reclamo actualizado
            } else {
                return null; // Si no se actualizó, retornar null
            }
        } catch (error) {
            console.error("Error al actualizar la Reclamo Estado:", error);
            throw error; // Lanzar el error para que pueda ser manejado por el llamador
        }
    };
}

    /*
    updateReclamosEstado = async (id, reclamoEstado) => {
        const campos = Object.keys(reclamoEstado);
        const valores = campos.map((campo) => reclamoEstado[campo]);
        const consulta = `UPDATE reclamos_estado SET ${campos
        .map((campo) => `${campo} = ?`)
        .join(", ")} WHERE idReclamoEstado = ?`;
    
        try {
        const [result] = await pool.query(consulta, [...valores, id]);
        if (result.affectedRows > 0) {
            const [reclamosEstadoActualizado] = await pool.query(
            "SELECT * FROM reclamos_estado WHERE idReclamoEstado = ?",
            [id]
            );
            return reclamosEstadoActualizado[0];
        } else {
            return null;
        }
        } catch (error) {
        console.error("Error al actualizar la Reclamo Estado:", error);
        throw error;
        }
    };
    */