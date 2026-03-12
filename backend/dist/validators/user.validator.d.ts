/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de user.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { z } from 'zod';
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        employee: "employee";
        doctor: "doctor";
    }>;
}, z.core.$strip>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
//# sourceMappingURL=user.validator.d.ts.map