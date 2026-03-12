import { z } from 'zod';
export declare const createPurchaseOrderItemSchema: z.ZodObject<{
    product_id: z.ZodNumber;
    quantity: z.ZodNumber;
    unit_cost: z.ZodNumber;
}, z.core.$strip>;
export declare const createPurchaseOrderSchema: z.ZodObject<{
    supplier_id: z.ZodNumber;
    user_id: z.ZodOptional<z.ZodNumber>;
    expected_delivery_date: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    items: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        quantity: z.ZodNumber;
        unit_cost: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const receivePurchaseOrderItemSchema: z.ZodObject<{
    purchase_order_item_id: z.ZodNumber;
    batch_number: z.ZodString;
    expiry_date: z.ZodString;
    location: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const receivePurchaseOrderSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        purchase_order_item_id: z.ZodNumber;
        batch_number: z.ZodString;
        expiry_date: z.ZodString;
        location: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateExpectedDateSchema: z.ZodObject<{
    expected_delivery_date: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export type CreatePurchaseOrderInput = z.infer<typeof createPurchaseOrderSchema>;
export type ReceivePurchaseOrderInput = z.infer<typeof receivePurchaseOrderSchema>;
export type UpdateExpectedDateInput = z.infer<typeof updateExpectedDateSchema>;
//# sourceMappingURL=purchaseOrder.validator.d.ts.map