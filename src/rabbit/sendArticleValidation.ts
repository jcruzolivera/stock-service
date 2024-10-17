import amqp from "amqplib";

// Definir el tipo de retorno de la función sendArticleValidation
type ValidationResult = { valid: boolean; msg: string };

// Función que envía la solicitud de validación y espera la respuesta
export const sendArticleValidation = async (
  articleId: number
): Promise<ValidationResult> => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const requestQueue = "article_validation_queue";
    const responseQueue = await channel.assertQueue("", { exclusive: true });

    const correlationId = generateUuid();

    // Enviar solicitud de validación de artículo
    const message = JSON.stringify({ action: "validate_article", articleId });
    channel.sendToQueue(requestQueue, Buffer.from(message), {
      correlationId: correlationId,
      replyTo: responseQueue.queue,
    });

    console.log(`Enviando validación para el articleId: ${articleId}`);

    // Esperar respuesta de la cola
    return new Promise((resolve, reject) => {
      channel.consume(
        responseQueue.queue,
        (msg) => {
          if (msg && msg.properties.correlationId === correlationId) {
            const response = JSON.parse(msg.content.toString());
            resolve(response);
            setTimeout(() => {
              connection.close();
            }, 500);
          }
        },
        { noAck: true }
      );
    });
  } catch (error) {
    console.error("Error en la validación del artículo:", error);
    return { valid: false, msg: `Error procesando la validación.` };
  }
};

// Generar un ID único para la correlación
function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}
