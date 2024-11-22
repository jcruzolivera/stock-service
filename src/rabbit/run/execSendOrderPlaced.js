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
const readline_1 = __importDefault(require("readline"));
const sendOrderPlaced_1 = require("../sendOrderPlaced"); // Asegúrate de ajustar la ruta si es necesario
// Interfaz de readline para capturar la entrada del usuario
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Preguntar al usuario por el articleId y quantity
    rl.question("Ingresa el articleId a validar: ", (articleId) => {
        rl.question("Ingresa la cantidad de la orden: ", (quantity) => __awaiter(void 0, void 0, void 0, function* () {
            // Construir el objeto de datos y convertirlo a JSON
            const order = {
                articleId: String(articleId),
                quantity: Number(quantity),
            };
            // Enviar la orden
            yield (0, sendOrderPlaced_1.sendOrderPlaced)(JSON.stringify(order));
            console.log("Orden enviada:", order);
            rl.close(); // Cerrar la interfaz de readline
        }));
    });
}))();
