import jwt from 'jsonwebtoken';
import passport from "passport";

export default class AuthController {

    login = async (req, res) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Solicitud incorrecta',
                    user
                });
            }

            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '5m' });
                return res.json({ token });
            });
        })(req, res);
    };

}