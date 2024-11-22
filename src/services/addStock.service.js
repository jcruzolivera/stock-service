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
exports.addArticleStock = void 0;
const movStock_1 = __importDefault(require("./../models/movStock"));
const stock_1 = __importDefault(require("./../models/stock"));
const addArticleStock = (articleId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stockFound = yield stock_1.default.findOne({ articleId });
        if (!stockFound) {
            return null;
        }
        let movStock = yield movStock_1.default.create({
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
});
exports.addArticleStock = addArticleStock;
