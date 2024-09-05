import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const ProductSchema = Schema({
title:          {type: String, required: true},
description:    {type: String, required: true},
code:           {type: String, required: true},
price:          {type: Number, required: true},
status:         {type: Boolean, required: true},
stock:          {type: Number, required: true},
category:       {type: String, required: true},
thumbnails:     [String]
})

ProductSchema.plugin(mongoosePaginate)

export const ProductModel= model('products', ProductSchema)
