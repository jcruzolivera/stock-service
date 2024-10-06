import amqp from 'amqplib';

const receiveMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'stock_updates';

    await channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for messages in queue: ${queue}`);

    // Consumiendo mensajes
    await channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`Received message: ${msg.content.toString()}`);
        channel.ack(msg); // Confirmar que se ha recibido el mensaje
      }
    });
  } catch (error) {
    console.error('Error receiving message:', error);
  }
};

// Llamar a la función para comenzar a recibir mensajes
receiveMessage();
