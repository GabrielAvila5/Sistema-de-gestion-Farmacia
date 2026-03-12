import { z } from 'zod';
export declare const generatePrescriptionSchema: z.ZodObject<{
    doctorName: z.ZodString;
    doctorLicense: z.ZodUnion<[z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodLiteral<"">]>;
    patientName: z.ZodString;
    patientCode: z.ZodUnion<[z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodLiteral<"">]>;
    patientAge: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    patientAllergies: z.ZodUnion<[z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodLiteral<"">]>;
    diagnosis: z.ZodString;
    treatment: z.ZodString;
    consultationId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type GeneratePrescriptionInput = z.infer<typeof generatePrescriptionSchema>;
//# sourceMappingURL=prescription.validator.d.ts.map