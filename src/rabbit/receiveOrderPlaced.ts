import amqp from "amqplib";
import connectDB from "../config/database";
import { validateArticleStock } from "../services/validateStock.service";

const receiveOrderPlaced = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const queue = "stock_updates"; // Cola de RabbitMQ

    await channel.assertQueue(queue, { durable: false });
    console.log(`Esperando mensajes en la cola: ${queue}`);

    // Consumiendo mensajes
    await channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        console.log(`Mensaje recibido : ${content}`);

        // Procesar la orden y ajustar el stock
        const orderDetails = JSON.parse(content);
        const result = await processOrderAndAdjustStock(orderDetails);

        if (result.valid) {
          console.log("Stock actualizado.");
        } else {
          console.error("Actualización de stock fallo.");
        }

        channel.ack(msg); // Confirmar que se ha recibido el mensaje
      }
    });
  } catch (error) {
    console.error("Error al recibir order placed message:", error);
  }
};

// Función que ajusta el stock basado en el mensaje recibido
const processOrderAndAdjustStock = async (orderDetails: any) => {
  console.log(`Procesando order para articleId: ${orderDetails.articleId}`);
  try {
    // Validar y ajustar el stock del artículo
    await validateArticleStock(orderDetails.articleId, orderDetails.quantity);
    console.log("Stock ajustado correctamente");
    return { valid: true }; // Retornar validación exitosa
  } catch (error) {
    console.error("Error ajustando el stock:", error);
    return { valid: false }; // Retornar validación fallida
  }
};

// Conectar a MongoDB
connectDB();

// Llamar a la función para comenzar a recibir mensajes
receiveOrderPlaced();
