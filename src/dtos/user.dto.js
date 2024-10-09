import Joi from "joi";
import { getUserByEmail } from "../services/carts.service.js";
/* const userSchema = new Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    age: { type: Number, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    cart: { type: Schema.Types.ObjectId, ref: "cart" },
});
 */


export const userDto = Joi.object({
    first_name:     Joi.string().required(),
    last_name:      Joi.string().required(),
    email:          Joi.string().required(),
    age:            Joi.number().required(),
    password:       Joi.string().required(),
    role:           Joi.string().required(),
})

export const resUserDto = async(user)=>{

    const dbUser = await getUserByEmail(user.email)
    //console.log("DBUSER", dbUser);
    
    const responseUserData = {
        email: user.email,
        role: user.role,
    }

    if(dbUser[0].cart){
        responseUserData.cart = dbUser[0].cart
    }

    return responseUserData
}