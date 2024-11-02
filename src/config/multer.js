import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Carpeta donde se guardan las umagenes
        cb(null, 'img/');
    },
    filename: (req, file, cb) => {
     
        const originalName = path.basename(file.originalname, path.extname(file.originalname));     
        const timestamp = Date.now();        
        // Concateno con el nombre del arhivo y lo concateno con timestamp
        const newFileName = `${originalName}-${timestamp}${path.extname(file.originalname)}`;        // Llamar a 
        cb(null, newFileName);
    }
});

// Filtro de formato de imágenes permitidas
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;
