"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentSchema = exports.createAppointmentSchema = void 0;
/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de appointment.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const zod_1 = require("zod");
exports.createAppointmentSchema = zod_1.z.object({
    patient_id: zod_1.z.number().int().positive('El ID del paciente debe ser un número válido'),
    doctor_id: zod_1.z.number().int().positive('El ID del doctor debe ser un número válido').optional(),
    appointment_date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'La fecha de la cita no es válida' }),
    status: zod_1.z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']).optional(),
    reason: zod_1.z.string().min(2, 'El motivo de la consulta es obligatorio'),
    source: zod_1.z.enum(['Teléfono', 'Presencial', 'Web']).default('Presencial')
});
exports.updateAppointmentSchema = zod_1.z.object({
    appointment_date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date))).optional(),
    status: zod_1.z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']).optional(),
});
//# sourceMappingURL=appointment.validator.js.map