import express from 'express';
import { createSale } from '../controllers/saleController';
import { createSaleSchema } from '../validators/sale.validator';
import { validateBody } from '../middlewares/validateBody';
import { authenticate } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

const router = express.Router();

// Middleware global para proteger estas rutas
router.use(authenticate);

// POST /api/sales → valida token, restringe a admin/employee, valida Zod y crea
router.route('/')
    .post(checkRole(['admin', 'employee']), validateBody(createSaleSchema), createSale);

export default router;
