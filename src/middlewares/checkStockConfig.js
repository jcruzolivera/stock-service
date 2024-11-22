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
exports.checkStockConfig = void 0;
const checkStockConfig = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { articleId, currentStock, minStock, repositionQty } = req.body;
        let error = "";
        if (!articleId || articleId < 0) {
            error += "El ID del artículo es obligatorio. - ";
        }
        if (currentStock && currentStock < 0) {
            error += "El stock actual debe ser positivo. - ";
        }
        if (minStock && minStock < 0) {
            error += "El stock mínimo debe ser positivo. - ";
        }
        if (repositionQty && repositionQty < 0) {
            error += "La cantidad de reposición debe ser positiva. - ";
        }
        if (error !== "") {
            res.status(400).json({ message: error });
            return;
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
        return;
    }
});
exports.checkStockConfig = checkStockConfig;
