import { z } from 'zod';

export const createConsultationSchema = z.object({
    patient_id: z.number().int().positive(),
    doctor_id: z.number().int().positive(),
    temperature: z.number().positive().optional(),
    weight: z.number().positive().optional(),
    height: z.number().positive().optional(),
    bmi: z.number().positive().optional(),
    abdominal_circ: z.number().positive().optional(),
    diagnosis: z.string().min(3, "El diagnóstico es requerido"),
    treatment: z.string().min(3, "El tratamiento es requerido"),
    notes: z.string().optional(),
    end_treatment_date: z.string().datetime().optional()
});

export type CreateConsultationInput = z.infer<typeof createConsultationSchema>;
