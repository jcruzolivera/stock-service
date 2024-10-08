import amqp from "amqplib";
import { validateArticleStock } from "./../services/validateStock";

const receiveOrderPlacedMessage = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "order_placed"; // Ajusta la cola a la que Orders envía sus eventos

    await channel.assertQueue(queue, { durable: true }); // Colas durables en producción
    console.log(`Waiting for messages in queue: ${queue}`);

    // Consumiendo mensajes
    await channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        console.log(`Received order placed: ${content}`);

        // Procesar la orden y ajustar el stock
        const orderDetails = JSON.parse(content);
        await processOrderAndAdjustStock(orderDetails);

        channel.ack(msg); // Confirmar que se ha recibido el mensaje
      }
    });
  } catch (error) {
    console.error("Error receiving order placed message:", error);
  }
};

// Función que ajusta el stock basado en el mensaje recibido
const processOrderAndAdjustStock = async (orderDetails: any) => {
  console.log(`Processing order for articleId: ${orderDetails.articleId}`);
  try {
    // Validar y ajustar el stock del artículo
    await validateArticleStock(orderDetails.articleId, orderDetails.quantity);
    console.log("Stock ajustado correctamente");
  } catch (error) {
    console.error("Error ajustando el stock:", error);
  }
};

// Llamar a la función para comenzar a recibir mensajes
receiveOrderPlacedMessage();
