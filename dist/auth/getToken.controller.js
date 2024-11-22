"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'SECRET_KEY';
const getToken = (req, res) => {
    const user = { id: 1, name: 'User1' }; // Datos de ejemplo del usuario
    const token = jsonwebtoken_1.default.sign(user, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token }); // Devuelve el token al cliente
};
exports.getToken = getToken;
