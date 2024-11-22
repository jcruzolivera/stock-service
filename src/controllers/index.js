"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStock = exports.getStockByArticleId = exports.configureStock = void 0;
const configureStock_controller_1 = require("./command/configureStock.controller");
Object.defineProperty(exports, "configureStock", { enumerable: true, get: function () { return configureStock_controller_1.configureStock; } });
const getStock_controller_1 = require("./query/getStock.controller");
Object.defineProperty(exports, "getStockByArticleId", { enumerable: true, get: function () { return getStock_controller_1.getStockByArticleId; } });
const addStock_controller_1 = require("./command/addStock.controller");
Object.defineProperty(exports, "addStock", { enumerable: true, get: function () { return addStock_controller_1.addStock; } });
