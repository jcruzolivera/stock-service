import amqp from "amqplib";
import readline from "readline";

// interfaz de readline para capturar la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sendOrderPlaced = async (msg: string) => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const queue = "stock_updates";

    await channel.assertQueue(queue, { durable: false });

    // Enviar mensaje a la cola
    channel.sendToQueue(queue, Buffer.from(msg), { persistent: true }); // Mensaje persistente

    console.log(`Mensaje enviado: ${msg}`);

    // Cerrar la conexión después de un breve retraso
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
  }
};

// Preguntar al usuario por el articleId y quantity
rl.question("Ingresa el articleId a validar: ", (articleId) => {
  rl.question("Ingresa la cantidad de la orden: ", (quantity) => {
    sendOrderPlaced(
      '{"articleId": ' + Number(articleId) + ', "quantity": ' + Number(quantity) + "}"
    );
    rl.close(); // Cerrar la interfaz de readline
  });
});
