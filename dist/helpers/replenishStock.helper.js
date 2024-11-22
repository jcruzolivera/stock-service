"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replenish = void 0;
const stock_1 = __importDefault(require("./../models/stock"));
const movStock_1 = __importDefault(require("./../models/movStock"));
const replenish = async (articleId) => {
    try {
        const stock = await stock_1.default.findOne({ articleId });
        if (!stock) {
            return {
                msg: "Stock no encontrado para el artículo con id " + articleId,
                success: false,
            };
        }
        const repositionQty = stock.repositionQty || 0;
        //Si el stock mínimo no esta definido, debe ser igual a 0
        const minStock = stock.minStock || 0;
        // Si la cantidad a reponer no esta definida o es cero, no reponer stock.
        if (repositionQty <= 0) {
            return {
                msg: "Cantidad de reposición igual a 0. No se puede reponer stock",
                success: true,
            };
        }
        // Verificamos si el stock es menor o igual al mínimo configurado
        if (stock.currentStock <= minStock) {
            await movStock_1.default.create({
                articleId,
                movType: "INCR",
                quantity: repositionQty,
                description: "Reposición automática de stock",
                creationUser: "sistema",
            });
            stock.currentStock += repositionQty;
            await stock.save();
            return {
                msg: stock,
                success: true,
            };
        }
        else {
            return {
                msg: "No es necesario reponer stock",
                success: true,
            };
        }
    }
    catch (error) {
        return {
            msg: error,
            success: false,
        };
    }
};
exports.replenish = replenish;
