import { pool } from './connectionMySql.js';

export default class ReclamosTipoDatabase {
    getReclamosTipo = async () => {
        try {
            const query = 'SELECT idReclamoTipo, descripcion, activo FROM reclamos_tipo WHERE activo';
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getReclamosTipoById = async (id) => {
        try {
            const query = 'SELECT idReclamoTipo, descripcion, activo FROM reclamos_tipo WHERE idReclamoTipo = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    addReclamosTipo = async (nuevoReclamoTipo) => {
        const { descripcion, activo } = nuevoReclamoTipo;
        try {
            const query = 'INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?, ?)';
            const [result] = await pool.query(query, [descripcion, activo]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    deleteReclamosTipo = async (id) => {
        try {
            const query = 'UPDATE reclamos_tipo SET activo = 0 WHERE idReclamoTipo = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    updateReclamosTipo = async (id, reclamoTipo) => {
        // Construir la consulta SQL para actualizar los campos específicos
        const consulta = `UPDATE reclamos_tipo SET descripcion = ?, activo = ? WHERE idReclamoTipo = ?`;
        
        try {
            // Ejecutar la consulta con los valores correspondientes
            const [result] = await pool.query(consulta, [reclamoTipo.descripcion, reclamoTipo.activo, id]);
            
            // Verificar si se actualizó alguna fila
            if (result.affectedRows > 0) {
                // Si se actualizó, realizar una consulta para obtener el tipo de reclamo actualizado
                const [reclamosTipoActualizado] = await pool.query(
                    "SELECT * FROM reclamos_tipo WHERE idReclamoTipo = ?",
                    [id]
                );
                return reclamosTipoActualizado[0]; // Retornar el tipo de reclamo actualizado
            } else {
                return null; // Si no se actualizó, retornar null
            }
        } catch (error) {
            console.error("Error al actualizar la Reclamo Tipo:", error);
            throw error; // Lanzar el error para que pueda ser manejado por el llamador
        }
    };
}