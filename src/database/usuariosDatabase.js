import { pool } from './connectionMySql.js';

export default class UsuariosDataBase {
    getUsuarios = async () => {
        try {
            const query = 'SELECT idUsuario, nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo FROM usuarios WHERE activo';
            const [result] = await pool.query(query)
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getUsuarioById = async (id) => {
        try {
            const query = 'SELECT idUsuario, nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo FROM usuarios WHERE idUsuario = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    addUsuario = async (nuevoUsuario) => {
        const {nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo} = nuevoUsuario;
        try {
            const query = 'INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const [result] = await pool.query(query, [nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo]);
            return ({ id: result.insertId, nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    deleteUsuario = async (id) => {
        try {
            const query = 'UPDATE usuarios SET activo = 0 WHERE idUsuario = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    updateUsuario = async (id, usuario) => {
        const campos = Object.keys(usuario);
        const valores = campos.map((campo) => usuario[campo]);
        const consulta = `UPDATE usuarios SET ${campos
        .map((campo) => `${campo} = ?`)
        .join(", ")} WHERE idUsuario = ?`;
    
        try {
        const [result] = await pool.query(consulta, [...valores, id]);
        if (result.affectedRows > 0) {
            const [usuarioActualizado] = await pool.query(
            "SELECT * FROM usuarios WHERE idUsuario = ?",
            [id]
            );
            return usuarioActualizado[0];
        } else {
            return null;
        }
        } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        throw error;
        }
    };
}