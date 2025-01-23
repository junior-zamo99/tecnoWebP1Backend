
import { Schema } from "mongoose";

export const VentaSchema = new Schema({
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'cliente',
        required: true
    },
    total:{
        type:Number,
        required: true
    },
    envio:{
        type:Number,
        required: true
    },  
    estado:{
        type:String,
        default:'Procesado',
        required: true
    },
    createdAT: { type: Date, default: Date.now }


});