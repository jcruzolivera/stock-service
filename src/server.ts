import express from 'express';
import connectDB from './config/database';
import stockRoutes from './routes/stockRoutes';
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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
