"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpectedDateSchema = exports.receivePurchaseOrderSchema = exports.receivePurchaseOrderItemSchema = exports.createPurchaseOrderSchema = exports.createPurchaseOrderItemSchema = void 0;
const zod_1 = require("zod");
exports.createPurchaseOrderItemSchema = zod_1.z.object({
    product_id: zod_1.z.number().int().positive(),
    quantity: zod_1.z.number().int().positive(),
    unit_cost: zod_1.z.number().positive(),
});
exports.createPurchaseOrderSchema = zod_1.z.object({
    supplier_id: zod_1.z.number().int().positive(),
    user_id: zod_1.z.number().int().positive().optional(),
    expected_delivery_date: zod_1.z.string().optional().nullable(),
    items: zod_1.z.array(exports.createPurchaseOrderItemSchema).min(1, 'La orden debe tener al menos un producto'),
});
exports.receivePurchaseOrderItemSchema = zod_1.z.object({
    purchase_order_item_id: zod_1.z.number().int().positive(),
    batch_number: zod_1.z.string().min(1, 'El número de lote es obligatorio'),
    expiry_date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Fecha inválida" }),
    location: zod_1.z.string().optional().nullable(),
});
exports.receivePurchaseOrderSchema = zod_1.z.object({
    items: zod_1.z.array(exports.receivePurchaseOrderItemSchema).min(1, 'Se requiere información de lote para recibir'),
});
exports.updateExpectedDateSchema = zod_1.z.object({
    expected_delivery_date: zod_1.z.string().nullable(),
});
//# sourceMappingURL=purchaseOrder.validator.js.map