import { Schema } from 'mongoose';

export const TenantSchema = new Schema({
  nombreTienda: {
    type: String,
    required: true,
    trim: true,
  },
  tipo:{
    type: Number,
    required: true,
    trim: true,
  }
});