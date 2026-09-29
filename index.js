const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Configurar Middleware de CORS
app.use(cors({
  origin: '*', // Permite solicitudes desde cualquier origen (Vercel, Localhost, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Conectado Exitosamente'))
  .catch((err) => console.error('Error de conexión a MongoDB:', err));

// 3. Ruta de prueba principal
app.get('/', (req, res) => {
  res.send('API del Inventario TESJo corriendo correctamente en Render');
});

// 4. Montar las rutas de componentes bajo la ruta /api/components
const componentesRoutes = require('./routes/componentesroutes.js');
app.use('/api/components', componentesRoutes.default || componentesRoutes);

// 5. Puerto dinámico para Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});