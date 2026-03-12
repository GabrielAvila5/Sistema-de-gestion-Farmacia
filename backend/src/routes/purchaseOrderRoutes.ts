import express from 'express';
import {
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    receivePurchaseOrder,
    cancelPurchaseOrder,
    updateExpectedDate
} from '../controllers/purchaseOrderController';
import { createPurchaseOrderSchema, receivePurchaseOrderSchema, updateExpectedDateSchema } from '../validators/purchaseOrder.validator';
import { validateBody } from '../middlewares/validateBody';
import { authenticate } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

const router = express.Router();

router.use(authenticate);

// Listar y crear órdenes (admin o manager)
router.route('/')
    .get(checkRole(['admin', 'employee', 'doctor']), getPurchaseOrders)
    .post(checkRole(['admin', 'employee']), validateBody(createPurchaseOrderSchema), createPurchaseOrder);

// Acciones sobre una orden específica
router.route('/:id')
    .get(checkRole(['admin', 'employee', 'doctor']), getPurchaseOrderById);

// Recibir orden (registrar lote y stock)
router.post('/:id/receive', checkRole(['admin', 'employee']), validateBody(receivePurchaseOrderSchema), receivePurchaseOrder);

// Modificar fecha esperada
router.put('/:id/expected-date', checkRole(['admin', 'employee']), validateBody(updateExpectedDateSchema), updateExpectedDate);

// Cancelar orden
router.post('/:id/cancel', checkRole(['admin', 'employee']), cancelPurchaseOrder);

export default router;
