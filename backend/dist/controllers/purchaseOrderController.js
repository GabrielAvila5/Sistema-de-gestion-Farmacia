"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelPurchaseOrder = exports.updateExpectedDate = exports.receivePurchaseOrder = exports.createPurchaseOrder = exports.getPurchaseOrderById = exports.getPurchaseOrders = void 0;
const PurchaseOrderService_1 = __importDefault(require("../services/PurchaseOrderService"));
const getPurchaseOrders = async (req, res) => {
    try {
        const orders = await PurchaseOrderService_1.default.getAllPurchaseOrders();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPurchaseOrders = getPurchaseOrders;
const getPurchaseOrderById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ error: 'ID inválido' });
        const order = await PurchaseOrderService_1.default.getPurchaseOrderById(id);
        res.json(order);
    }
    catch (error) {
        if (error.message === 'Orden de compra no encontrada') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};
exports.getPurchaseOrderById = getPurchaseOrderById;
const createPurchaseOrder = async (req, res) => {
    try {
        // En un entorno productivo real, el user_id vendría del token (req.user),
        // pero lo dejaremos tomar del body si se envía, o lo sobre-escribiremos aquí.
        // Aquí asumimos que el body trae `user_id` o lo obtenemos de `req.user.id`.
        // Usaremos `req.user?.id` si está disponible por authMiddleware.
        const userId = req.user?.id || req.body.user_id;
        if (!userId) {
            return res.status(400).json({ error: 'Usuario no identificado' });
        }
        const data = {
            ...req.body,
            user_id: userId
        };
        const order = await PurchaseOrderService_1.default.createPurchaseOrder(data);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createPurchaseOrder = createPurchaseOrder;
const receivePurchaseOrder = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ error: 'ID inválido' });
        const order = await PurchaseOrderService_1.default.receivePurchaseOrder(id, req.body);
        res.json(order);
    }
    catch (error) {
        if (error.message === 'Orden de compra no encontrada') {
            return res.status(404).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
};
exports.receivePurchaseOrder = receivePurchaseOrder;
const updateExpectedDate = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ error: 'ID inválido' });
        const { expected_delivery_date } = req.body;
        const order = await PurchaseOrderService_1.default.updateExpectedDate(id, expected_delivery_date);
        res.json(order);
    }
    catch (error) {
        if (error.message === 'Orden de compra no encontrada') {
            return res.status(404).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
};
exports.updateExpectedDate = updateExpectedDate;
const cancelPurchaseOrder = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ error: 'ID inválido' });
        const order = await PurchaseOrderService_1.default.cancelPurchaseOrder(id);
        res.json(order);
    }
    catch (error) {
        if (error.message === 'Orden de compra no encontrada') {
            return res.status(404).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
};
exports.cancelPurchaseOrder = cancelPurchaseOrder;
//# sourceMappingURL=purchaseOrderController.js.map