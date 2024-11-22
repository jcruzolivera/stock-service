"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderPlaced = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const sendOrderPlaced = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib_1.default.connect("amqp://localhost:5672");
        const channel = yield connection.createChannel();
        const queue = "stock_updates"; // Cola a la que se envían los pedidos
        const replyQueue = yield channel.assertQueue("", { exclusive: true }); // Cola de respuesta exclusiva para este emisor
        // Generar un correlationId único para este mensaje
        const correlationId = generateUuid();
        // Escuchar la cola de respuesta para recibir el resultado del proceso
        channel.consume(replyQueue.queue, (msg) => {
            if (msg && msg.properties.correlationId === correlationId) {
                console.log("Respuesta recibida:", msg.content.toString());
                connection.close(); // Cerrar la conexión una vez recibida la respuesta
            }
        }, { noAck: true });
        // Enviar mensaje a la cola de pedidos junto con la información de la cola de respuesta y correlationId
        channel.sendToQueue(queue, Buffer.from(msg), {
            correlationId: correlationId,
            replyTo: replyQueue.queue,
        });
        console.log(`Mensaje enviado: ${msg}`);
    }
    catch (error) {
        console.error("Error al enviar el mensaje:", error);
    }
});
exports.sendOrderPlaced = sendOrderPlaced;
// Función auxiliar para generar un UUID
const generateUuid = () => {
    return (Math.random().toString() +
        Math.random().toString() +
        Math.random().toString());
};
