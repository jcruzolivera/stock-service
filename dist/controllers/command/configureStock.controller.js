"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureStock = void 0;
const configureStock_service_1 = require("../../services/configureStock.service");
const calculateStock_service_1 = require("../../services/calculateStock.service");
const configureStock = async (req, res) => {
    const { articleId, currentStock, minStock, repositionQty } = req.body;
    try {
        const stock = await (0, configureStock_service_1.configureArticleStock)(articleId, currentStock, minStock, repositionQty);
        if (!stock) {
            return res.status(200).json({ message: "ArticleId no encontrado" });
        }
        const stockCalculated = await (0, calculateStock_service_1.calculateStock)(articleId);
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
};
exports.configureStock = configureStock;
