import Joi from "joi";


/* const ProductSchema = Schema({
    title:          {type: String, required: true},
    description:    {type: String, required: true},
    code:           {type: String, required: true},
    price:          {type: Number, required: true},
    status:         {type: Boolean, required: true},
    stock:          {type: Number, required: true},
    category:       {type: String, required: true},
    thumbnails:     [String]
    })
 */
export const productDto =Joi.object({
    title:          Joy.string().required(),
    description:    Joy.string().required(),
    code:           Joy.string().required(),
    price:          Joy.number().required(),
    status:         Joy.boolean().required(),
    stock:          Joy.number().required(),
    category:       Joy.string().required(),
})