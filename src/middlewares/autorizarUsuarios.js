/*
Middleware para autorizar usuarios -autorizarUsuarios.js- y  
según los permisos de los perfiles de usuario implementar su 
uso en los endpoints
*/

//función que evalúa el perfil que se va a autorizar
export default function autorizarUsuarios(perfilAutorizados =[]) {
    return (req, res,next) => {
        const usuario = req.user;

        if (!usuario || !perfilAutorizados.includes(usuario.idUsuarioTipo)) {
            return res.status(403).json({
                estado: "falló",
                mensaje: "Acceso denegado"

            })
        }
    }
};
