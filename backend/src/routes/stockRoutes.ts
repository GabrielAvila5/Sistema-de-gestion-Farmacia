import { Router } from 'express';
import StockController from '../controllers/stockController';
import { validateBody } from '../middlewares/validateBody';
import { quickRestockSchema } from '../validators/stock.validator';
import { authenticate } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

const router = Router();

// Todas las rutas de inventario requieren autenticación
router.use(authenticate);

// Ingreso rápido de inventario (Solo Admin/Manager, o los roles definidos)
router.post(
    '/quick-restock',
    checkRole(['admin', 'manager']),
    validateBody(quickRestockSchema),
    StockController.quickRestock
);

// Historial de movimientos
router.get(
    '/movements',
    checkRole(['admin', 'manager']),
    StockController.getInventoryMovements
);

export default router;
