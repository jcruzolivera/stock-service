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
exports.replenishArticleStock = void 0;
const replenishStock_helper_1 = require("./../helpers/replenishStock.helper");
const replenishArticleStock = (articleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stock = yield (0, replenishStock_helper_1.replenish)(articleId);
        if (stock.success) {
            return stock;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.replenishArticleStock = replenishArticleStock;
