/**
 * @fileoverview Define los endpoints (rutas) de la API para sale y enlaza sus respectivos controladores.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import express from 'express';
import { createSale, getSales, getSaleById, voidSale } from '../controllers/saleController';
import { createSaleSchema } from '../validators/sale.validator';
import { validateBody } from '../middlewares/validateBody';
import { authenticate } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

const router = express.Router();

// Middleware global para proteger estas rutas
router.use(authenticate);

// GET /api/sales → Solo admin puede ver el historial completo
router.get('/', checkRole(['admin']), getSales);

// GET /api/sales/:id → Admin puede ver detalle de cualquier venta
router.get('/:id', checkRole(['admin']), getSaleById);

// POST /api/sales → Admin y empleados pueden crear ventas
router.post('/', checkRole(['admin', 'employee']), validateBody(createSaleSchema), createSale);

// POST /api/sales/:id/void → Solo admin puede anular ventas
router.post('/:id/void', checkRole(['admin']), voidSale);

export default router;
