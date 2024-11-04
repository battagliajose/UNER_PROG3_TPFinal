// Valida que el Content-Type sea application/json
const validateContentType = (req, res, next) => {
    // Verificamos si el método es POST, PUT o PATCH
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        // Permitimos multipart/form-data o application/json
        const contentType = req.headers['content-type'];
        if (contentType !== 'application/json' && !contentType.startsWith('multipart/form-data')) {
            return res.status(400).send('Content-Type debe ser application/json o multipart/form-data');
        }
    }
    next();
};

export default validateContentType;