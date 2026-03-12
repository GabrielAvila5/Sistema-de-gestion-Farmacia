"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatientSchema = exports.createPatientSchema = void 0;
/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de patient.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const zod_1 = require("zod");
exports.createPatientSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    last_name: zod_1.z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
    date_of_birth: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'La fecha de nacimiento es inválida o no tiene formato correcto',
    }),
    phone: zod_1.z.string().optional().or(zod_1.z.literal('')),
    email: zod_1.z.string().email('Formato de email inválido').optional().or(zod_1.z.literal('')),
    gender: zod_1.z.string().optional().or(zod_1.z.literal('')),
    address: zod_1.z.string().optional().or(zod_1.z.literal('')),
    has_allergies: zod_1.z.boolean().default(false),
    allergies_detail: zod_1.z.string().optional().or(zod_1.z.literal('')),
    medical_history: zod_1.z.string().optional().or(zod_1.z.literal('')),
    is_incomplete: zod_1.z.boolean().optional().default(false),
});
exports.updatePatientSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(2).optional(),
    last_name: zod_1.z.string().min(2).optional(),
    date_of_birth: zod_1.z.string().refine((date) => !isNaN(Date.parse(date))).optional(),
    phone: zod_1.z.string().optional().or(zod_1.z.literal('')),
    email: zod_1.z.string().email().optional().or(zod_1.z.literal('')),
    gender: zod_1.z.string().optional().or(zod_1.z.literal('')),
    address: zod_1.z.string().optional().or(zod_1.z.literal('')),
    has_allergies: zod_1.z.boolean().optional(),
    allergies_detail: zod_1.z.string().optional().or(zod_1.z.literal('')),
    medical_history: zod_1.z.string().optional().or(zod_1.z.literal('')),
});
//# sourceMappingURL=patient.validator.js.map