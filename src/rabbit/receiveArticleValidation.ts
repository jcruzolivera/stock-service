import amqp from "amqplib";

// Simlucacion base de datos de artículos en microservicio CATALOGO
const mockDatabase = [
  { id: 1, name: "Article 1" },
  { id: 67890, name: "Article 2" },
];

export const receiveArticleValidation = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const queue = "article_validation_queue";

    await channel.assertQueue(queue, { durable: true });
    console.log(`Esperando mensajes en la cola: ${queue}`);

    // Consumir mensajes
    await channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        console.log(`Mensaje recibido: ${content}`);

        // Procesar la validación del artículo
        const validationRequest = JSON.parse(content);
        const result = await processArticleValidation(validationRequest);

        // Enviar la respuesta a la cola indicada en el mensaje
        if (msg.properties.replyTo) {
          channel.sendToQueue(
            msg.properties.replyTo, // La cola de respuesta
            Buffer.from(JSON.stringify(result)), // La respuesta en formato JSON
            {
              correlationId: msg.properties.correlationId, // Enviar el mismo correlationId
            }
          );
        }

        channel.ack(msg); // Confirmar que se ha recibido el mensaje
      }
    });
  } catch (error) {
    console.error("Error al recibir el mensaje:", error);
  }
};

// Función que valida el artículo basado en el mensaje recibido
const processArticleValidation = async (request: any) => {
  const articleId = request.articleId;
  console.log(`Validando articleId: ${articleId}`);

  // Simulación de validación
  const articleExists = mockDatabase.some((article) => article.id == articleId);
  let msg = `El articulo con id ${articleId}`;

  if (articleExists) {
    console.log(`Articulo con id ${articleId} existe.`);
    return { valid: true, msg: (msg += " existe.") };
    // Aquí puedes enviar un mensaje de vuelta o realizar otra acción si es necesario
  } else {
    console.log(`Articulo con id ${articleId} no existe.`);
    return { valid: false, msg: (msg += " no existe.") };
  }
};
