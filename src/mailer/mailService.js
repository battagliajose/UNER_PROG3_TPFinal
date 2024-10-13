import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { fileURLToPath } from 'url';


//otengo el origen
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },           
        });
    }

    sendEmail = async (to, subject, templateData) => {
        // Cargar la plantilla
        const templatePath = path.join(__dirname, '../mailer/template/enviosCorreo.hbs'); 
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        
        const template = handlebars.compile(templateSource);
       
        // Renderizar la plantilla con los datos
        const htmlToSend = template(templateData);

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            html: htmlToSend, // Usar el HTML renderizado
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email enviado exitosamente');
        } catch (error) {
            console.error('Error al enviar el email:', error);
        }
    };
}