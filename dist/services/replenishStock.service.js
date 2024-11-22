"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replenishArticleStock = void 0;
const replenishStock_helper_1 = require("./../helpers/replenishStock.helper");
const replenishArticleStock = async (articleId) => {
    try {
        const stock = await (0, replenishStock_helper_1.replenish)(articleId);
        if (stock.success) {
            return stock;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.replenishArticleStock = replenishArticleStock;
