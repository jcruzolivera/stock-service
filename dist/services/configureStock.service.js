"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureArticleStock = void 0;
const stock_1 = __importDefault(require("./../models/stock"));
const getArticleById_1 = __importDefault(require("./../rest/getArticleById"));
const configureArticleStock = async (articleId, currentStock, minStock, repositionQty) => {
    try {
        let stock = await stock_1.default.findOne({ articleId });
        if (stock) {
            // Actualizar el stock existente
            stock.currentStock = currentStock;
            stock.minStock = minStock;
            stock.repositionQty = repositionQty;
            await stock.save();
        }
        else {
            // Si no existe el stock, validar con el servicio de Catalogo que el articleId existe
            const result = await (0, getArticleById_1.default)(articleId);
            if (!result.valid) {
                console.log(result.msg); // Mostrar mensaje de que el artículo no existe
                return null; // Retornar null si no existe
            }
            // Crear nuevo stock
            stock = await stock_1.default.create({
                articleId,
                currentStock,
                minStock,
                repositionQty,
            });
        }
        return stock;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.configureArticleStock = configureArticleStock;
