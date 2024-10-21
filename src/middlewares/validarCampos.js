import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    // en caso de que existan errores los mapeo y los devuelvo al cliente
    if (!errores.isEmpty()){
        return res.status(400).json({
            estado:"Falla",
            mensaje: errores.mapped()
        })
    }

    //si no hay errores contin+úa la ejecución del endpoint
    next();
}   