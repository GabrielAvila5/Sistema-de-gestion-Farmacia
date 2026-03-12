"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaleSchema = void 0;
/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de sale.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const zod_1 = require("zod");
// Schema Zod para crear una venta
exports.createSaleSchema = zod_1.z.object({
    user_id: zod_1.z.number().int().positive('El ID de usuario es obligatorio'),
    items: zod_1.z.array(zod_1.z.object({
        product_id: zod_1.z.number().int().positive('El ID de producto es obligatorio'),
        quantity: zod_1.z.number().int().min(1, 'La cantidad debe ser al menos 1'),
    })).min(1, 'Debe haber al menos un artículo en la venta'),
    payment_method: zod_1.z.enum(['cash', 'card']).default('cash'),
    amount_paid: zod_1.z.number().positive('El monto recibido debe ser positivo').optional(),
});
//# sourceMappingURL=sale.validator.js.map