import Joi from "joi";


/* 
const CartSchema = Schema({
    products: [
        {
        _id: false,  //Esto es para que Mongo no me genere el ID porque lo voy a traer yo
        quantity: {type: Number, default: 1 },   //Por defecto inician en 1
        product: {type: Schema.Types.ObjectId,
        ref: "products"}
        }
    ]
})
*/

export const cartDto = Joy.object({
    products: Joi.array().items(
        
        Joi.object({
            product:    Joi.string().required(),
            quantity:   Joi.string().required(),
        })
    
    )
})