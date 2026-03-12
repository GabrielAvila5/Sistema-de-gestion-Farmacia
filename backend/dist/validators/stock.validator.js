"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickRestockSchema = void 0;
const zod_1 = require("zod");
exports.quickRestockSchema = zod_1.z.object({
    product_id: zod_1.z.number().int().positive('El ID del producto debe ser válido'),
    quantity: zod_1.z.number().int().positive('La cantidad debe ser mayor a 0'),
    batch_number: zod_1.z.string().min(1, 'El número de lote es obligatorio'),
    expiry_date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Fecha de caducidad inválida',
    }),
    unit_cost: zod_1.z.number().min(0, 'El costo unitario no puede ser negativo'),
    notes: zod_1.z.string().optional(),
});
//# sourceMappingURL=stock.validator.js.map