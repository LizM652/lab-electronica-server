import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import componentRoutes from './routes/componentRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Rutas de la API
app.use('/api/components', componentRoutes);

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.send('API del Laboratorio de Electrónica Funcionando Correctamente');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});