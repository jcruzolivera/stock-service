"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const sendOrderPlaced_1 = require("../sendOrderPlaced"); // Asegúrate de ajustar la ruta si es necesario
// Interfaz de readline para capturar la entrada del usuario
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
(async () => {
    // Preguntar al usuario por el articleId y quantity
    rl.question("Ingresa el articleId a validar: ", (articleId) => {
        rl.question("Ingresa la cantidad de la orden: ", async (quantity) => {
            // Construir el objeto de datos y convertirlo a JSON
            const order = {
                articleId: String(articleId),
                quantity: Number(quantity),
            };
            // Enviar la orden
            await (0, sendOrderPlaced_1.sendOrderPlaced)(JSON.stringify(order));
            console.log("Orden enviada:", order);
            rl.close(); // Cerrar la interfaz de readline
        });
    });
})();
