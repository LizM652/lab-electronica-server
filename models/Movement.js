import mongoose from 'mongoose';

const movementSchema = new mongoose.Schema(
  {
    component: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component',
      required: true,
    },
    type: {
      type: String,
      enum: ['ENTRADA', 'SALIDA', 'PRESTAMO', 'DEVOLUCION'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La cantidad debe ser al menos 1'],
    },
    userResponsible: {
      type: String, // Nombre del alumno, técnico o docente
      required: true,
      trim: true,
    },
    projectOrReason: {
      type: String, // Ej: "Proyecto Final Robótica", "Práctica 3"
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Movement = mongoose.model('Movement', movementSchema);