"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Función para obtener un artículo por ID
const getArticleById = async (articleId) => {
    const options = {
        method: "GET",
        url: `http://localhost:3002/v1/articles/${articleId}`,
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklEIjoiNjcxNzFhNDdiNjIzNTIyZDgxMjQxZDY3IiwidXNlcklEIjoiNjcxNmRkZGNiOGJmZDg5YTc3ZjhjNmYwIn0.JF5eKadtdNaxzVZXTTLJ5ltAkxB3MBH6TZFt1PtTm-o",
        },
    };
    try {
        const response = await axios_1.default.request(options);
        console.log("Data:", response.data); // Muestra los datos de la respuesta
        return { valid: true }; // Retorna que el artículo es válido si la respuesta es exitosa
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error Message:", error.message); // Mensaje de error de Axios
            console.error("Error Response:", error.response?.data); // Datos de error del servidor
            return { valid: false, msg: "El artículo no existe" }; // Retorna que el artículo no es válido
        }
        else {
            console.error("Unexpected Error:", error); // Otro tipo de error
            return { valid: false, msg: "Error inesperado" }; // Retorna que el artículo no es válido por un error inesperado
        }
    }
};
exports.default = getArticleById; // Corrige la exportación para que sea getArticleById
