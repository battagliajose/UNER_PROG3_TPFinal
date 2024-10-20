import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import UsuariosService from '../services/usuariosService.js'

const estrategia = new LocalStrategy({
    usernameField: 'correoElectronico',
    passwordField: 'contrasenia'
},
    async (correoElectronico, contrasenia, done) => {
        try {
            const usuariosService = new UsuariosService();
            const user = await usuariosService.validateUsuarioByMail(correoElectronico, contrasenia);
            if (!user) {
                return done(null, false, { message: 'Login incorrecto!' });
            } else {
                return done(null, user, { message: 'Login correcto!' });
            }
        } catch (error) {
            done(error);
        }
    }
);

const validacion = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    async (jwtPayload, done) => {
        const usuariosService = new UsuariosService();
        const user = await usuariosService.getUsuarioById(jwtPayload.idUsuario);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Token incorrecto.' });
        }
    }
);

export { estrategia, validacion };