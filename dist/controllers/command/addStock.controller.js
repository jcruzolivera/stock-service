"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStock = void 0;
const addStock_service_1 = require("../../services/addStock.service");
const calculateStock_service_1 = require("../../services/calculateStock.service");
const addStock = async (req, res) => {
    const { articleId } = req.params;
    const { quantity } = req.body;
    try {
        const stock = await (0, addStock_service_1.addArticleStock)(articleId, quantity);
        if (!stock) {
            return res.status(200).json({ message: "ArticleId no encontrado" });
        }
        const stockCalculated = await (0, calculateStock_service_1.calculateStock)(articleId);
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
};
exports.addStock = addStock;
