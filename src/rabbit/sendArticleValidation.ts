import amqp from "amqplib";
import readline from "readline";

// interfaz de readline para capturar la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sendArticleValidation = async (articleId: string) => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const queue = "article_validation_queue"; // Cola para validación de artículos

    await channel.assertQueue(queue, { durable: true });
    const message = JSON.stringify({ action: "validate_article", articleId });
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`Validando mensaje para el articleId: ${articleId}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error al recibir el mensaje:", error);
  }
};

// Preguntar al usuario por el articleId
rl.question("Ingresa el articleId a validar: ", (articleId) => {
  sendArticleValidation(articleId);
  rl.close(); // Cerrar la interfaz de readline
});
