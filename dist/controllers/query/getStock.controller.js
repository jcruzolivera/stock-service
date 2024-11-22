"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockByArticleId = void 0;
const getStock_service_1 = require("../../services/getStock.service");
const getStockByArticleId = async (req, res) => {
    const { articleId } = req.params;
    try {
        const stock = await (0, getStock_service_1.getArticleStock)(articleId);
        return res.status(200).json(stock);
    }
    catch (error) {
        return res.status(500).json({ message: "Error al consultar stock", error });
    }
};
exports.getStockByArticleId = getStockByArticleId;
