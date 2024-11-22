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
exports.configureStock = void 0;
const configureStock_service_1 = require("../../services/configureStock.service");
const calculateStock_service_1 = require("../../services/calculateStock.service");
const configureStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleId, currentStock, minStock, repositionQty } = req.body;
    try {
        const stock = yield (0, configureStock_service_1.configureArticleStock)(articleId, currentStock, minStock, repositionQty);
        if (!stock) {
            return res.status(200).json({ message: "ArticleId no encontrado" });
        }
        const stockCalculated = yield (0, calculateStock_service_1.calculateStock)(articleId);
        if (!stockCalculated) {
            return res.status(200).json({ message: "Stock no encontrado" });
        }
        return res
            .status(200)
            .json({ message: "Stock configurado correctamente", stock });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error al configurar stock", error });
    }
});
exports.configureStock = configureStock;
