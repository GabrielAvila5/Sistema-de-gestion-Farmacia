"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Define los endpoints (rutas) de la API para product y enlaza sus respectivos controladores.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const product_validator_1 = require("../validators/product.validator");
const validateBody_1 = require("../middlewares/validateBody");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
// Middleware global para proteger todas las rutas de productos (requiere JWT válido)
router.use(authMiddleware_1.authenticate);
// GET /api/products/search → buscar productos para autocompletado en consultas
router.get('/search', (0, roleMiddleware_1.checkRole)(['admin', 'employee', 'doctor']), productController_1.searchProducts);
// GET /api/products     → lista todos los productos con sus lotes (admin, employee)
// POST /api/products    → crea un producto (solo admin)
router.route('/')
    .get((0, roleMiddleware_1.checkRole)(['admin', 'employee']), productController_1.getProducts)
    .post((0, roleMiddleware_1.checkRole)(['admin']), (0, validateBody_1.validateBody)(product_validator_1.createProductSchema), productController_1.createProduct);
// GET /api/products/:id    → obtiene un producto por ID (admin, employee)
// PUT /api/products/:id    → actualiza un producto por ID (solo admin)
// DELETE /api/products/:id → elimina un producto por ID (solo admin)
router.route('/:id')
    .get((0, roleMiddleware_1.checkRole)(['admin', 'employee']), productController_1.getProductById)
    .put((0, roleMiddleware_1.checkRole)(['admin']), (0, validateBody_1.validateBody)(product_validator_1.updateProductSchema), productController_1.updateProduct)
    .delete((0, roleMiddleware_1.checkRole)(['admin']), productController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map