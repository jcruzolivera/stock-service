"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth");
const router = (0, express_1.Router)();
//Calcular stock de articulo por movimientos
router.get("/", auth_1.getToken);
exports.default = router;
