import { Schema, model } from "mongoose";

const TicketSchema = Schema({
    code: {type: String , required:true},
    purchase_datetime: {type: Date , required:true, default: Date.now},
    amount: {type: Number, required: true},
    purchaser: {type: String , required:true},
    purchaserId: {type: Schema.Types.ObjectId, ref:"user", required:true}
})

export const TicketModel= model('tickets', TicketSchema)