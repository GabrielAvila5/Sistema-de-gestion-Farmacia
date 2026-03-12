import { z } from 'zod';
export declare const createConsultationSchema: z.ZodObject<{
    patient_id: z.ZodNumber;
    doctor_id: z.ZodNumber;
    temperature: z.ZodOptional<z.ZodNumber>;
    weight: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    bmi: z.ZodOptional<z.ZodNumber>;
    abdominal_circ: z.ZodOptional<z.ZodNumber>;
    diagnosis: z.ZodString;
    treatment: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
    end_treatment_date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateConsultationInput = z.infer<typeof createConsultationSchema>;
//# sourceMappingURL=consultation.validator.d.ts.map