// Importa las bibliotecas necesarias
import { createObjectCsvWriter } from 'csv-writer'; // Para escribir archivos CSV
import puppeteer, { Browser } from "puppeteer";     // Para manipular un navegador sin interfaz gráfica y generar PDFs
import handlebars from 'handlebars';                // Para compilar y renderizar plantillas HTML

import fs from 'fs';                                // Para leer y escribir archivos del sistema de archivos
import path from 'path';                            // Para manipular rutas de archivos y directorios
import { fileURLToPath } from 'url';                // Para trabajar con URLs en módulos ES

// Configura __filename y __dirname en entornos de ES modules (como en Node.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define y exporta la clase InformeService
export default class InformeService {
    
    // Método para generar un archivo CSV con datos de reclamos
    informeReclamosCsv = async (datosReporte) => {
        // Define la ruta donde se guardará el archivo CSV
        let ruta = path.resolve(__dirname, '..');
        ruta = path.join(ruta, '/utiles/reclamos.csv'); 

        // Configura un objeto escritor para crear el archivo CSV
        const csvWriter = createObjectCsvWriter({
            path: ruta,  // Ruta del archivo CSV
            header: [    // Configura los encabezados del CSV, mapeando las claves del objeto a títulos de columnas
                {id: 'reclamo', title: 'RECLAMO'},
                {id: 'tipo', title: 'TIPO'},
                {id: 'estado', title: 'ESTADO'},
                {id: 'fechaCreado', title: 'FECHA CREADO'},
                {id: 'cliente', title: 'CLIENTE'},
            ],
            encoding:'utf-8' // Configura la codificación del archivo a UTF-8
        });

        // Genera y escribe el archivo CSV usando los datos proporcionados
        await csvWriter.writeRecords(datosReporte);

        // Retorna la ruta del archivo CSV generado
        return ruta;
    }

    // Método para generar un archivo PDF con datos de reclamos
    informeReclamosPdf = async (datosReporte) => {
        try {
            // Lee la plantilla HTML para el informe desde el sistema de archivos
            const filePath = path.join(__dirname, '../utiles/handlebars/plantilla-informe.html');
            const htmlTemplate = fs.readFileSync(filePath, 'utf8');

            // Compila la plantilla HTML usando Handlebars
            const template = handlebars.compile(htmlTemplate);
            // Rellena la plantilla con los datos del reporte
            const htmlFinal = template(datosReporte);

            // Lanza un navegador sin interfaz gráfica usando Puppeteer
            const browser = await puppeteer.launch();

            // Abre una nueva página en el navegador
            const page = await browser.newPage();

            // Carga la plantilla HTML final en la página
            await page.setContent(htmlFinal, {waitUntil: 'load'});

            // Genera el PDF a partir de la página HTML cargada, configurando formato y márgenes
            const pdfBuffer = await page.pdf({
                format:'A4',
                printBackground: true,                // Incluye el fondo al imprimir
                margin: {top: '10px', bottom: '10px'} // Configura los márgenes superior e inferior
            });

            // Cierra el navegador
            await browser.close();

            // Retorna el PDF como un buffer
            return pdfBuffer;

        } catch (error) {
            // En caso de error, imprime el error en consola y lo lanza nuevamente
            console.error('Error generando el PDF:', error);
            throw error;
        }
    }
}