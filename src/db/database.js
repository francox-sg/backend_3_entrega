import mongoose from "mongoose";
import 'dotenv/config' 
const MONGO_URL = process.env.MONGO_URL 



export const initMongoDB = async () =>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Conectado a la base de datos de Mongo");

        /* const product = {
            title: "TV",
            description: "32 pulgadas",
            code: "11322",
            price: 144440,
            status: true,
            stock: 410,
            category: "Tecnologia",
            }
            console.log("Escritura", await ProductModel.create(product) ); */
            /* console.log("Lectura", await ProductModel.find({}) ); */
    } catch (error) {
        console.log(error);
    }
}


//initMongoDB()
