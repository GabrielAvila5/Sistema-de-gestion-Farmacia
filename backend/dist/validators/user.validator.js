"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de user.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
    email: zod_1.z.string().email('Email inválido').max(100),
    password: zod_1.z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(255),
    role: zod_1.z.enum(['admin', 'employee', 'doctor']),
});
//# sourceMappingURL=user.validator.js.map