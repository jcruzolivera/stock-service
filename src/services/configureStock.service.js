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
exports.configureArticleStock = void 0;
const stock_1 = __importDefault(require("./../models/stock"));
const getArticleById_1 = __importDefault(require("./../rest/getArticleById"));
const configureArticleStock = (articleId, currentStock, minStock, repositionQty) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let stock = yield stock_1.default.findOne({ articleId });
        if (stock) {
            // Actualizar el stock existente
            stock.currentStock = currentStock;
            stock.minStock = minStock;
            stock.repositionQty = repositionQty;
            yield stock.save();
        }
        else {
            // Si no existe el stock, validar con el servicio de Catalogo que el articleId existe
            const result = yield (0, getArticleById_1.default)(articleId);
            if (!result.valid) {
                console.log(result.msg); // Mostrar mensaje de que el artículo no existe
                return null; // Retornar null si no existe
            }
            // Crear nuevo stock
            stock = yield stock_1.default.create({
                articleId,
                currentStock,
                minStock,
                repositionQty,
            });
        }
        return stock;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.configureArticleStock = configureArticleStock;
