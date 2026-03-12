"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supplierController_1 = require("../controllers/supplierController");
const supplier_validator_1 = require("../validators/supplier.validator");
const validateBody_1 = require("../middlewares/validateBody");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
router.route('/')
    .get((0, roleMiddleware_1.checkRole)(['admin', 'employee', 'doctor']), supplierController_1.getSuppliers)
    .post((0, roleMiddleware_1.checkRole)(['admin']), (0, validateBody_1.validateBody)(supplier_validator_1.createSupplierSchema), supplierController_1.createSupplier);
router.route('/:id')
    .get((0, roleMiddleware_1.checkRole)(['admin', 'employee', 'doctor']), supplierController_1.getSupplierById)
    .put((0, roleMiddleware_1.checkRole)(['admin']), (0, validateBody_1.validateBody)(supplier_validator_1.updateSupplierSchema), supplierController_1.updateSupplier)
    .delete((0, roleMiddleware_1.checkRole)(['admin']), supplierController_1.deleteSupplier);
router.route('/:id/status')
    .patch((0, roleMiddleware_1.checkRole)(['admin']), supplierController_1.toggleSupplierStatus);
exports.default = router;
//# sourceMappingURL=supplierRoutes.js.map