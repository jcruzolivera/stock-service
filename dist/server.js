"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const stock_routes_1 = __importDefault(require("./routes/stock.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const receiveOrderPlaced_1 = require("./rabbit/receiveOrderPlaced");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Conectar a MongoDB
(0, database_1.default)();
// Middleware para JSON
app.use(express_1.default.json());
// Rutas
app.use('/api/stock', stock_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
// Llamar a la función para comenzar a recibir mensajes
(0, receiveOrderPlaced_1.receiveOrderPlaced)();
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
