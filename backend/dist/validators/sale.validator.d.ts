/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de sale.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { z } from 'zod';
export declare const createSaleSchema: z.ZodObject<{
    user_id: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        quantity: z.ZodNumber;
    }, z.core.$strip>>;
    payment_method: z.ZodDefault<z.ZodEnum<{
        cash: "cash";
        card: "card";
    }>>;
    amount_paid: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type CreateSaleInput = z.infer<typeof createSaleSchema>;
//# sourceMappingURL=sale.validator.d.ts.map