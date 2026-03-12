/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de appointment.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { z } from 'zod';
export declare const createAppointmentSchema: z.ZodObject<{
    patient_id: z.ZodNumber;
    doctor_id: z.ZodOptional<z.ZodNumber>;
    appointment_date: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        SCHEDULED: "SCHEDULED";
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
    }>>;
    reason: z.ZodString;
    source: z.ZodDefault<z.ZodEnum<{
        Teléfono: "Teléfono";
        Presencial: "Presencial";
        Web: "Web";
    }>>;
}, z.core.$strip>;
export declare const updateAppointmentSchema: z.ZodObject<{
    appointment_date: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        SCHEDULED: "SCHEDULED";
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
    }>>;
}, z.core.$strip>;
export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
//# sourceMappingURL=appointment.validator.d.ts.map