import express from 'express';
import connectDB from './config/database';
import stockRoutes from './routes/stock.routes';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

// Middleware para JSON
app.use(express.json());

// Rutas
app.use('/api/stock', stockRoutes);

app.use('/api/auth', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
