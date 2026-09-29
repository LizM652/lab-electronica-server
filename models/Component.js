import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'El nombre del componente es obligatorio'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      enum: [
        'Resistencias',
        'Capacitores',
        'Inductores',
        'Diodos y LEDs',
        'Transistores',
        'Circuitos Integrados',
        'Microcontroladores y Módulos',
        'Sensores',
        'Conectores y Cables',
        'Herramientas e Instrumental',
        'Otros',
      ],
    },
    value: {
      type: String, // Ej: "10k ohm", "100uF", "5V", "ATmega328P"
      trim: true,
    },
    packageType: {
      type: String, // Ej: "DIP-8", "SMD 0805", "TO-220", "Módulo"
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    minStock: {
      type: Number,
      default: 5, // Umbral para alertas de stock bajo
    },
    location: {
      type: String, // Ej: "Estante A - Caja 3", "Cajón B2"
      required: [true, 'La ubicación física es obligatoria'],
      trim: true,
    },
    datasheetUrl: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  }
);

export const Component = mongoose.model('Component', componentSchema);