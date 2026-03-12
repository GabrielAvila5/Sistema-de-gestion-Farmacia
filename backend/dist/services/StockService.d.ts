export interface QuickRestockInput {
    product_id: number;
    quantity: number;
    batch_number: string;
    expiry_date: Date;
    unit_cost: number;
    notes?: string;
    user_id: number;
}
declare class StockService {
    /**
     * Reabastecimiento Directo / Rápido
     * Permite ingresar inventario sin necesidad de una Orden de Compra previa.
     * 1. Crea un lote en `batches`.
     * 2. Registra el movimiento en `inventory_movements`.
     * 3. Revisa si el `unit_cost` amerita sugerir un cambio de `base_price` (Opcional, se puede manejar si el costo unitario >= precio base).
     */
    quickRestock(data: QuickRestockInput): Promise<{
        batch: {
            batch_number: string;
            quantity: number;
            expiry_date: Date;
            promo_price: import("@prisma/client/runtime/library").Decimal | null;
            location: string | null;
            id: number;
            unit_cost: import("@prisma/client/runtime/library").Decimal | null;
            product_id: number | null;
        };
        priceUpdated: boolean;
        previousPrice: number;
        newBasePrice: number;
    }>;
    getInventoryMovements(): Promise<({
        batches: {
            products: {
                name: string;
                id: number;
                sku: string;
            } | null;
        } & {
            batch_number: string;
            quantity: number;
            expiry_date: Date;
            promo_price: import("@prisma/client/runtime/library").Decimal | null;
            location: string | null;
            id: number;
            unit_cost: import("@prisma/client/runtime/library").Decimal | null;
            product_id: number | null;
        };
        users: {
            name: string;
            id: number;
        };
    } & {
        quantity: number;
        id: number;
        batch_id: number;
        movement_type: string;
        notes: string | null;
        created_at: Date;
        user_id: number;
    })[]>;
}
declare const _default: StockService;
export default _default;
//# sourceMappingURL=StockService.d.ts.map