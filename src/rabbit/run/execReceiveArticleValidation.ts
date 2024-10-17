import { receiveArticleValidation } from "./../receiveArticleValidation";
import connectDB from "../../config/database";

// Conectar a MongoDB
connectDB();

// Llamar a la función para comenzar a recibir mensajes
receiveArticleValidation();
