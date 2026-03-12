"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockController_1 = __importDefault(require("../controllers/stockController"));
const validateBody_1 = require("../middlewares/validateBody");
const stock_validator_1 = require("../validators/stock.validator");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
// Todas las rutas de inventario requieren autenticación
router.use(authMiddleware_1.authenticate);
// Ingreso rápido de inventario (Solo Admin/Manager, o los roles definidos)
router.post('/quick-restock', (0, roleMiddleware_1.checkRole)(['admin', 'manager']), (0, validateBody_1.validateBody)(stock_validator_1.quickRestockSchema), stockController_1.default.quickRestock);
// Historial de movimientos
router.get('/movements', (0, roleMiddleware_1.checkRole)(['admin', 'manager']), stockController_1.default.getInventoryMovements);
exports.default = router;
//# sourceMappingURL=stockRoutes.js.map