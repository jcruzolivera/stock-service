import amqp from "amqplib";

export const sendOrderPlaced = async (msg: string) => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const queue = "stock_updates"; // Cola a la que se envían los pedidos
    const replyQueue = await channel.assertQueue("", { exclusive: true }); // Cola de respuesta exclusiva para este emisor

    // Generar un correlationId único para este mensaje
    const correlationId = generateUuid();

    // Escuchar la cola de respuesta para recibir el resultado del proceso
    channel.consume(
      replyQueue.queue,
      (msg) => {
        if (msg && msg.properties.correlationId === correlationId) {
          console.log("Respuesta recibida:", msg.content.toString());
          connection.close(); // Cerrar la conexión una vez recibida la respuesta
        }
      },
      { noAck: true }
    );

    // Enviar mensaje a la cola de pedidos junto con la información de la cola de respuesta y correlationId
    channel.sendToQueue(queue, Buffer.from(msg), {
      correlationId: correlationId,
      replyTo: replyQueue.queue,
    });

    console.log(`Mensaje enviado: ${msg}`);
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
  }
};

// Función auxiliar para generar un UUID
const generateUuid = () => {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
};
