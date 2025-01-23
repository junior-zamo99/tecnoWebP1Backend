import { Schema } from 'mongoose'


export const RolSchema = new Schema({  
    nombre:{
        type: String,
        require: true,
        trim: true,
    },
    funcionalidades: [{
        type: Schema.Types.ObjectId,
        require: false,
        trim: true,
        ref: 'funcionalidad'
    }]
    })