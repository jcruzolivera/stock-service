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
exports.getStockByArticleId = void 0;
const getStock_service_1 = require("../../services/getStock.service");
const getStockByArticleId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleId } = req.params;
    try {
        const stock = yield (0, getStock_service_1.getArticleStock)(articleId);
        return res.status(200).json(stock);
    }
    catch (error) {
        return res.status(500).json({ message: "Error al consultar stock", error });
    }
});
exports.getStockByArticleId = getStockByArticleId;
