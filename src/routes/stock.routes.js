"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
//Obtener stock por id de articulo
router.get('/:articleId', controllers_1.getStockByArticleId);
//Configurar stock nuevo o existente
router.post('/', middlewares_1.checkAuth, middlewares_1.checkStockConfig, controllers_1.configureStock);
//Reponer stock de articulo
//router.post('/replenish', checkAuth, replenishStock as any);
//Validar stock de artículo
//router.post('/validate', checkAuth, validateStock as any);
//Calcular stock de articulo por movimientos
router.put('/add/:articleId', middlewares_1.checkAuth, controllers_1.addStock);
exports.default = router;
