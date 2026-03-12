"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSupplierSchema = exports.createSupplierSchema = void 0;
const zod_1 = require("zod");
exports.createSupplierSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(150),
    contact_name: zod_1.z.string().max(150).optional().nullable(),
    phone: zod_1.z.string().max(20).optional().nullable(),
    email: zod_1.z.string().email('Email inválido').max(100).optional().nullable(),
    lead_time_days: zod_1.z.number().int().min(0).optional().nullable()
});
exports.updateSupplierSchema = exports.createSupplierSchema.partial();
//# sourceMappingURL=supplier.validator.js.map