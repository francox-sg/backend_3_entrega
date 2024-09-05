import dotenv from "dotenv"

dotenv.config();

export const config ={
    mailer:{
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        auth:{
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD,
        } 
    }
}