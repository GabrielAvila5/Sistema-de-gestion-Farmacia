"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de product.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const zod_1 = require("zod");
// Schema del lote (batch) reutilizable
const batchSchema = zod_1.z.object({
    batch_number: zod_1.z.string().min(1, 'El número de lote es obligatorio'),
    quantity: zod_1.z.number().int().min(0, 'La cantidad debe ser >= 0'),
    expiry_date: zod_1.z.string().refine((d) => !isNaN(Date.parse(d)), {
        message: 'Fecha de caducidad inválida',
    }),
    promo_price: zod_1.z.number().positive().optional(),
    location: zod_1.z.string().optional(),
});
// Schema Zod para crear un producto
// El SKU se genera automáticamente en el servicio con nanoid, no se espera del cliente
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'El nombre del producto es obligatorio'),
    description: zod_1.z.string().optional(),
    base_price: zod_1.z.number().positive('El precio debe ser mayor a 0'),
    category: zod_1.z.string().optional(),
    brand: zod_1.z.string().optional(),
    supplier_id: zod_1.z.number().int().positive().optional().nullable(),
    min_stock: zod_1.z.number().int().min(0).optional(),
    // Lotes: array de lotes a crear junto al producto
    batches: zod_1.z.array(batchSchema).optional(),
});
// Schema para actualizar un producto (todos los campos opcionales)
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    base_price: zod_1.z.number().positive().optional(),
    category: zod_1.z.string().optional(),
    brand: zod_1.z.string().optional(),
    supplier_id: zod_1.z.number().int().positive().optional().nullable(),
    min_stock: zod_1.z.number().int().min(0).optional(),
});
//# sourceMappingURL=product.validator.js.map