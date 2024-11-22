"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addArticleStock = void 0;
const movStock_1 = __importDefault(require("./../models/movStock"));
const stock_1 = __importDefault(require("./../models/stock"));
const addArticleStock = async (articleId, quantity) => {
    try {
        const stockFound = await stock_1.default.findOne({ articleId });
        if (!stockFound) {
            return null;
        }
        let movStock = await movStock_1.default.create({
            articleId,
            movType: "INCR",
            quantity,
            description: "Add stock manually",
            creationUser: "sistema",
        });
        return movStock;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.addArticleStock = addArticleStock;
