import nodemailer from 'nodemailer'
import { config } from '../config/mailerConfig.js'

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mailer.host,
            port: config.mailer.port,
            auth: config.mailer.auth
        })
    }

    getMessageTemplate(type, name){
        let body = ""
        
        
        switch (type) {
            case "welcome":
                
                body += `Bienvenido ${name} !
                
                Este es un mensaje de Prueba del curso de Backend 2
                `
                break;
        
            case "birthday":
                
                body += `Feliz Cumpleaños ${name} !
                
                Te desea el equipo de Backend 2
                `
                break;
                
            default:
                body += `Mensaje a  ${name} !
                
                Servicio de Mensajeria
                `
                break;
            }
            
            
        body += `Saludos! `

        return body
    }

    async sendMail({to, subject, type, name}) {
        //Se deshabilita envío de mensajeria por haber dado de baja la clave en gmail

        /* const message = this.getMessageTemplate(type, name)

        const info = await this.transporter.sendMail({
            from: "Equipo Backend 2",
            to,
            subject,
            html:message,
            attatchments:[]
        })
        console.log(message);
        */
        console.log("Mensajeria deshabilitada");
        } 
        
}

export const mailService = new MailService();