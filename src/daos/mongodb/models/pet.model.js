import { Schema, model } from "mongoose";

const petSchema = new Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    owner: { type: String },
    adopted: { type: Boolean, require: true },

});

export const petModel = model("pet", petSchema);
