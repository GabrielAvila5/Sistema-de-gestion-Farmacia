import express from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController';
import { createProductSchema, updateProductSchema } from '../validators/product.validator';
import { validateBody } from '../middlewares/validateBody';
import { authenticate } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

const router = express.Router();

// Middleware global para proteger todas las rutas de productos (requiere JWT válido)
router.use(authenticate);

// GET /api/products     → lista todos los productos con sus lotes (admin, employee)
// POST /api/products    → crea un producto (solo admin)
router.route('/')
    .get(checkRole(['admin', 'employee']), getProducts)
    .post(checkRole(['admin']), validateBody(createProductSchema), createProduct);

// GET /api/products/:id    → obtiene un producto por ID (admin, employee)
// PUT /api/products/:id    → actualiza un producto por ID (solo admin)
// DELETE /api/products/:id → elimina un producto por ID (solo admin)
router.route('/:id')
    .get(checkRole(['admin', 'employee']), getProductById)
    .put(checkRole(['admin']), validateBody(updateProductSchema), updateProduct)
    .delete(checkRole(['admin']), deleteProduct);

export default router;
