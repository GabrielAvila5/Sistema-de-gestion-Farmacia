"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de auth.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Debe ser un correo electrónico válido'),
    password: zod_1.z.string().min(1, 'La contraseña es requerida')
});
//# sourceMappingURL=authValidator.js.map