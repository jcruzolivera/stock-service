"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
const receiveOrderPlaced_1 = require("../receiveOrderPlaced");
// Conectar a MongoDB
(0, database_1.default)();
// Llamar a la función para comenzar a recibir mensajes
(0, receiveOrderPlaced_1.receiveOrderPlaced)();
