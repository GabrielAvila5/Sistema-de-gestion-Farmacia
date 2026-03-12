/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de auth.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=authValidator.d.ts.map