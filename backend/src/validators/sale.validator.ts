import { z } from 'zod';

// Schema Zod para crear una venta
export const createSaleSchema = z.object({
    user_id: z.number().int().positive('El ID de usuario es obligatorio'),
    items: z.array(z.object({
        product_id: z.number().int().positive('El ID de producto es obligatorio'),
        quantity: z.number().int().min(1, 'La cantidad debe ser al menos 1'),
    })).min(1, 'Debe haber al menos un artículo en la venta'),
});

export type CreateSaleInput = z.infer<typeof createSaleSchema>;
