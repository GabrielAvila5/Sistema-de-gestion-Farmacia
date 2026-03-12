"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchaseOrderController_1 = require("../controllers/purchaseOrderController");
const purchaseOrder_validator_1 = require("../validators/purchaseOrder.validator");
const validateBody_1 = require("../middlewares/validateBody");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
// Listar y crear órdenes (admin o manager)
router.route('/')
    .get((0, roleMiddleware_1.checkRole)(['admin', 'employee', 'doctor']), purchaseOrderController_1.getPurchaseOrders)
    .post((0, roleMiddleware_1.checkRole)(['admin', 'employee']), (0, validateBody_1.validateBody)(purchaseOrder_validator_1.createPurchaseOrderSchema), purchaseOrderController_1.createPurchaseOrder);
// Acciones sobre una orden específica
router.route('/:id')
    .get((0, roleMiddleware_1.checkRole)(['admin', 'employee', 'doctor']), purchaseOrderController_1.getPurchaseOrderById);
// Recibir orden (registrar lote y stock)
router.post('/:id/receive', (0, roleMiddleware_1.checkRole)(['admin', 'employee']), (0, validateBody_1.validateBody)(purchaseOrder_validator_1.receivePurchaseOrderSchema), purchaseOrderController_1.receivePurchaseOrder);
// Modificar fecha esperada
router.put('/:id/expected-date', (0, roleMiddleware_1.checkRole)(['admin', 'employee']), (0, validateBody_1.validateBody)(purchaseOrder_validator_1.updateExpectedDateSchema), purchaseOrderController_1.updateExpectedDate);
// Cancelar orden
router.post('/:id/cancel', (0, roleMiddleware_1.checkRole)(['admin', 'employee']), purchaseOrderController_1.cancelPurchaseOrder);
exports.default = router;
//# sourceMappingURL=purchaseOrderRoutes.js.map