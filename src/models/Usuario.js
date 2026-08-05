import mongoose from 'mongoose';

const direccionSchema = new mongoose.Schema(
  {
    calle: {
      type: String,
      required: [true, 'La calle es requerida en la dirección'],
      trim: true,
    },
    ciudad: {
      type: String,
      required: [true, 'La ciudad es requerida en la dirección'],
      trim: true,
    },
    pais: {
      type: String,
      required: [true, 'El país es requerido en la dirección'],
      trim: true,
    },
    codigo_postal: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'El email no tiene un formato válido'],
  },
  edad: {
    type: Number,
    required: false,
    min: [0, 'La edad no puede ser negativa'],
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  direcciones: {
    type: [direccionSchema],
    default: [],
  },
});


// Índice para acelerar las búsquedas por ciudad dentro del array de direcciones
usuarioSchema.index({ 'direcciones.ciudad': 1 });

export default mongoose.model('Usuario', usuarioSchema);
