import connectDB from "../../config/database";
import { receiveOrderPlaced } from "../receiveOrderPlaced";

// Conectar a MongoDB
connectDB();

// Llamar a la función para comenzar a recibir mensajes
receiveOrderPlaced();
