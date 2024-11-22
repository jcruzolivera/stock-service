"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateStock = void 0;
const stock_1 = __importDefault(require("../models/stock"));
const movStock_1 = __importDefault(require("../models/movStock"));
const calculateStock = async (articleId) => {
    try {
        const stockFound = await stock_1.default.findOne({ articleId });
        if (!stockFound) {
            return null;
        }
        const movements = await movStock_1.default.find({ articleId }).sort({
            creationDate: 1,
        });
        let currentStock = 0;
        movements.forEach((mov) => {
            if (mov.movType === "INCR") {
                currentStock += mov.quantity;
            }
            else if (mov.movType === "DECR") {
                currentStock -= mov.quantity;
            }
        });
        const stock = await stock_1.default.findOneAndUpdate({ articleId }, { currentStock }, { new: true });
        return stock;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.calculateStock = calculateStock;
