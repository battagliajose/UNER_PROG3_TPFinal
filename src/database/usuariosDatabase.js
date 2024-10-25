import { pool } from './connectionMySql.js';

export default class UsuariosDataBase {
    getUsuarios = async () => {
        try {
            const query = `SELECT   u.idUsuario,
                                    u.nombre, 
                                    u.apellido, 
                                    u.correoElectronico,                                     
                                    ut.descripcion as tipoUsuario, 
                                    u.imagen, 
                                    u.activo 
                                    FROM usuarios as u inner join usuarios_tipo ut 
                                    ON u.idUsuarioTipo=ut.idUsuarioTipo
                                    WHERE u.activo`;
            const [result] = await pool.query(query)
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getUsuarioById = async (id) => {
        try {
            const query = `SELECT   u.idUsuario,
                                    nombre,
                                    apellido,
                                    correoElectronico,
                                    u.idUsuarioTipo,
                                    ut.descripcion as tipoUsuario,
                                    imagen,
                                    u.activo
                                 FROM usuarios u 
                                 inner join usuarios_tipo ut 
                                 ON u.idUsuarioTipo = ut.idUsuarioTipo 
                                 WHERE idUsuario = ?`
            const [result] = await pool.query(query, [id]);
            return result[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    getUsuarioByName = async (nombre) => {
        try {
            const query = `SELECT   u.idUsuario,
                                    nombre,
                                    apellido,
                                    correoElectronico,
                                    contrasenia,
                                    u.idUsuarioTipo,
                                    ut.descripcion as tipoUsuario,
                                    imagen,
                                    u.activo
                                 FROM usuarios u 
                                 inner join usuarios_tipo ut 
                                 ON u.idUsuarioTipo = ut.idUsuarioTipo 
                                 WHERE nombre = ?`
            const [result] = await pool.query(query, [nombre]);
            return result[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    getOficinasUsuarioById = async (id) => {
        try {
            const query = `SELECT   o.idOficina as id,
                                    o.nombre as oficina
                                 FROM oficinas o 
                                 INNER JOIN usuarios_oficinas uo 
                                 ON o.idOficina = uo.idOficina 
                                 WHERE uo.idUsuario = ?;`
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
            const query = 'INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo) VALUES (?, ?, ?, SHA2(?, 256), ?, ?, ?)';
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

    // Ver cifrado de contraseña
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

    validateUsuarioByMail = async (correoElectronico, contrasenia) => {
        try {
            const query = `SELECT idUsuario,
                                  nombre,
                                  apellido,
                                  correoElectronico,
                                  idUsuarioTipo,
                                  imagen,
                                  activo
                                 FROM usuarios
                                 WHERE correoElectronico = ? and contrasenia = SHA2(?, 256) and activo = 1`
            const [result] = await pool.query(query, [correoElectronico, contrasenia]);
            return result[0];
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

}