import Joi from "joi";


export const authDto = Joi.object({
    email:  Joi.string().required(),
    password:  Joi.string().required(),
})