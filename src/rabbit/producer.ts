import amqp from 'amqplib';

const sendMessage = async (msg: string) => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'stock_updates';

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(`Message sent: ${msg}`);
    
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

sendMessage('Stock updated for articleId: 12345');
