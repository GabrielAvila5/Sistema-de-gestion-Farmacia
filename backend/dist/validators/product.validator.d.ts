/**
 * @fileoverview Esquemas de validación de datos para asegurar un formato correcto de entrada en la entidad de product.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { z } from 'zod';
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    base_price: z.ZodNumber;
    category: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodString>;
    supplier_id: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    min_stock: z.ZodOptional<z.ZodNumber>;
    batches: z.ZodOptional<z.ZodArray<z.ZodObject<{
        batch_number: z.ZodString;
        quantity: z.ZodNumber;
        expiry_date: z.ZodString;
        promo_price: z.ZodOptional<z.ZodNumber>;
        location: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    base_price: z.ZodOptional<z.ZodNumber>;
    category: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodString>;
    supplier_id: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    min_stock: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
//# sourceMappingURL=product.validator.d.ts.map