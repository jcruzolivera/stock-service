"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArticleStock = void 0;
const stock_1 = __importDefault(require("../models/stock"));
const movStock_1 = __importDefault(require("../models/movStock"));
const replenishStock_helper_1 = require("./../helpers/replenishStock.helper");
const validateArticleStock = async (articleId, quantity) => {
    try {
        const stock = await stock_1.default.findOne({ articleId });
        if (!stock) {
            return null;
        }
        if (stock.currentStock >= quantity) {
            // Disminuir stock
            await movStock_1.default.create({
                articleId,
                movType: "DECR",
                quantity,
                description: "Disminución por validación de orden",
                creationUser: "sistema",
            });
            stock.currentStock -= quantity;
            await stock.save();
            // Validar si hay que reponer el stock
            if (stock.currentStock <= stock.minStock) {
                await (0, replenishStock_helper_1.replenish)(articleId); // Llama a la reposición
            }
            return stock;
        }
        else {
            return { msg: "No hay suficiente stock para la orden" };
        }
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
exports.validateArticleStock = validateArticleStock;
