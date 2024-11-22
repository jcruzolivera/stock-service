"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleStock = void 0;
const stock_1 = __importDefault(require("./../models/stock"));
const getArticleStock = async (articleId) => {
    try {
        const stock = await stock_1.default.findOne({ articleId });
        if (!stock) {
            return {
                msg: "Stock no encontrado para el artículo con id " + articleId,
            };
        }
        return {
            currentStock: stock.currentStock,
            minStock: stock.minStock,
        };
    }
    catch (error) {
        return null;
    }
};
exports.getArticleStock = getArticleStock;
