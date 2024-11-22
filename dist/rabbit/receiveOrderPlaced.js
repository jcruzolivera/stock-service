"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveOrderPlaced = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const validateStock_service_1 = require("../services/validateStock.service");
const receiveOrderPlaced = async () => {
    try {
        const connection = await amqplib_1.default.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const queue = "stock_updates"; // Cola de RabbitMQ para recibir los pedidos
        await channel.assertQueue(queue, { durable: false });
        console.log(`Esperando mensajes en la cola: ${queue}`);
        // Consumir mensajes de la cola
        await channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const content = msg.content.toString();
                console.log(`Mensaje recibido: ${content}`);
                // Procesar la orden y ajustar el stock
                const orderDetails = JSON.parse(content);
                const result = await processOrderAndAdjustStock(orderDetails);
                if (result.valid) {
                    console.log("Stock actualizado correctamente.");
                }
                else {
                    console.error("Actualización de stock fallida.");
                }
                // Enviar la respuesta a la cola de respuesta del emisor
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)), // Enviar el resultado como respuesta
                {
                    correlationId: msg.properties.correlationId, // Mantener el correlationId para que el emisor lo identifique
                });
                channel.ack(msg); // Confirmar que se ha procesado el mensaje
            }
        });
    }
    catch (error) {
        console.error("Error al recibir order placed message:", error);
    }
};
exports.receiveOrderPlaced = receiveOrderPlaced;
// Función que ajusta el stock basado en el mensaje recibido
const processOrderAndAdjustStock = async (orderDetails) => {
    console.log(`Procesando order para articleId: ${orderDetails.articleId}`);
    try {
        // Validar y ajustar el stock del artículo
        await (0, validateStock_service_1.validateArticleStock)(orderDetails.articleId, orderDetails.quantity);
        console.log("Stock ajustado correctamente");
        return { valid: true, message: "Stock actualizado" }; // Retornar validación exitosa
    }
    catch (error) {
        console.error("Error ajustando el stock:", error);
        return { valid: false, message: "Error al ajustar el stock" }; // Retornar validación fallida
    }
};
