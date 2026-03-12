import { z } from 'zod';
export declare const quickRestockSchema: z.ZodObject<{
    product_id: z.ZodNumber;
    quantity: z.ZodNumber;
    batch_number: z.ZodString;
    expiry_date: z.ZodString;
    unit_cost: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type QuickRestockInput = z.infer<typeof quickRestockSchema>;
//# sourceMappingURL=stock.validator.d.ts.map