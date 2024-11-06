import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener el directorio raíz 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// carpeta a subir
const carpetaDestino = path.join(__dirname, '../img'); 

// Crear la carpeta si no existe
if (!fs.existsSync(carpetaDestino)) {
    fs.mkdirSync(carpetaDestino, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, carpetaDestino); 
    },
    filename: (req, file, cb) => {
        const originalName = path.basename(file.originalname, path.extname(file.originalname));
        const timestamp = Date.now();
        // Concateno con el nombre del archivo y lo concateno con timestamp
        const newFileName = `${originalName}-${timestamp}${path.extname(file.originalname)}`;
        cb(null, newFileName);
    }
});

// Filtro de formato de imágenes permitidas
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    // Verificar si el tipo de archivo es permitido
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

