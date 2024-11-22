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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStock = void 0;
const addStock_service_1 = require("../../services/addStock.service");
const calculateStock_service_1 = require("../../services/calculateStock.service");
const addStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleId } = req.params;
    const { quantity } = req.body;
    try {
        const stock = yield (0, addStock_service_1.addArticleStock)(articleId, quantity);
        if (!stock) {
            return res.status(200).json({ message: "ArticleId no encontrado" });
        }
        const stockCalculated = yield (0, calculateStock_service_1.calculateStock)(articleId);
        if (!stockCalculated) {
            return res.status(200).json({ message: "Stock no encontrado" });
        }
        return res
            .status(200)
            .json({ message: "Stock agregado correctamente", stock });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al agregar stock", error });
    }
});
exports.addStock = addStock;
