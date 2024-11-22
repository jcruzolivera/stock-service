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
exports.validateArticleStock = void 0;
const stock_1 = __importDefault(require("../models/stock"));
const movStock_1 = __importDefault(require("../models/movStock"));
const replenishStock_helper_1 = require("./../helpers/replenishStock.helper");
const validateArticleStock = (articleId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stock = yield stock_1.default.findOne({ articleId });
        if (!stock) {
            return null;
        }
        if (stock.currentStock >= quantity) {
            // Disminuir stock
            yield movStock_1.default.create({
                articleId,
                movType: "DECR",
                quantity,
                description: "Disminución por validación de orden",
                creationUser: "sistema",
            });
            stock.currentStock -= quantity;
            yield stock.save();
            // Validar si hay que reponer el stock
            if (stock.currentStock <= stock.minStock) {
                yield (0, replenishStock_helper_1.replenish)(articleId); // Llama a la reposición
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
});
exports.validateArticleStock = validateArticleStock;
