"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "SECRET_KEY";
// Middleware para validar JWT
const checkAuth = (req, res, next) => {
    // Obtener el token del encabezado 'Authorization'
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(403).json({ message: "Token no enviado" });
        return;
    }
    // Verificar que el encabezado tenga el formato 'Bearer <token>'
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(403).json({ message: "Token no válido" });
        return;
    }
    // Verificar el token
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(401).json({ message: "No está autorizado" });
            return;
        }
        // Si el token es válido, almacenar la información decodificada en req.user
        req.user = decoded;
        next(); // Llama al siguiente middleware o controlador
    });
};
exports.checkAuth = checkAuth;
