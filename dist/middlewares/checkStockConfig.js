"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStockConfig = void 0;
const checkStockConfig = async (req, res, next) => {
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
};
exports.checkStockConfig = checkStockConfig;
