"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Define los endpoints (rutas) de la API para sale y enlaza sus respectivos controladores.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const express_1 = __importDefault(require("express"));
const saleController_1 = require("../controllers/saleController");
const sale_validator_1 = require("../validators/sale.validator");
const validateBody_1 = require("../middlewares/validateBody");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
// Middleware global para proteger estas rutas
router.use(authMiddleware_1.authenticate);
// GET /api/sales → Solo admin puede ver el historial completo
router.get('/', (0, roleMiddleware_1.checkRole)(['admin']), saleController_1.getSales);
// GET /api/sales/:id → Admin puede ver detalle de cualquier venta
router.get('/:id', (0, roleMiddleware_1.checkRole)(['admin']), saleController_1.getSaleById);
// POST /api/sales → Admin y empleados pueden crear ventas
router.post('/', (0, roleMiddleware_1.checkRole)(['admin', 'employee']), (0, validateBody_1.validateBody)(sale_validator_1.createSaleSchema), saleController_1.createSale);
// POST /api/sales/:id/void → Solo admin puede anular ventas
router.post('/:id/void', (0, roleMiddleware_1.checkRole)(['admin']), saleController_1.voidSale);
exports.default = router;
//# sourceMappingURL=saleRoutes.js.map