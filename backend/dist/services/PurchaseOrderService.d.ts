import { CreatePurchaseOrderInput, ReceivePurchaseOrderInput } from '../validators/purchaseOrder.validator';
declare class PurchaseOrderService {
    getAllPurchaseOrders(): Promise<({
        suppliers: {
            name: string;
            id: number;
            email: string | null;
            is_active: boolean;
            phone: string | null;
            contact_name: string | null;
            lead_time_days: number | null;
        };
        users: {
            name: string;
            id: number;
        };
        items: ({
            products: {
                name: string;
                description: string | null;
                base_price: import("@prisma/client/runtime/library").Decimal;
                category: string | null;
                brand: string | null;
                supplier_id: number | null;
                min_stock: number;
                id: number;
                sku: string;
            };
        } & {
            quantity: number;
            id: number;
            unit_cost: import("@prisma/client/runtime/library").Decimal;
            product_id: number;
            purchase_order_id: number;
        })[];
    } & {
        supplier_id: number;
        id: number;
        user_id: number;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string;
        expected_delivery_date: Date | null;
        order_date: Date;
        received_date: Date | null;
    })[]>;
    getPurchaseOrderById(id: number): Promise<{
        suppliers: {
            name: string;
            id: number;
            email: string | null;
            is_active: boolean;
            phone: string | null;
            contact_name: string | null;
            lead_time_days: number | null;
        };
        users: {
            name: string;
            id: number;
        };
        items: ({
            products: {
                name: string;
                description: string | null;
                base_price: import("@prisma/client/runtime/library").Decimal;
                category: string | null;
                brand: string | null;
                supplier_id: number | null;
                min_stock: number;
                id: number;
                sku: string;
            };
        } & {
            quantity: number;
            id: number;
            unit_cost: import("@prisma/client/runtime/library").Decimal;
            product_id: number;
            purchase_order_id: number;
        })[];
    } & {
        supplier_id: number;
        id: number;
        user_id: number;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string;
        expected_delivery_date: Date | null;
        order_date: Date;
        received_date: Date | null;
    }>;
    createPurchaseOrder(data: CreatePurchaseOrderInput): Promise<{
        suppliers: {
            name: string;
            id: number;
            email: string | null;
            is_active: boolean;
            phone: string | null;
            contact_name: string | null;
            lead_time_days: number | null;
        };
        items: {
            quantity: number;
            id: number;
            unit_cost: import("@prisma/client/runtime/library").Decimal;
            product_id: number;
            purchase_order_id: number;
        }[];
    } & {
        supplier_id: number;
        id: number;
        user_id: number;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string;
        expected_delivery_date: Date | null;
        order_date: Date;
        received_date: Date | null;
    }>;
    updateExpectedDate(id: number, expected_delivery_date: string | null): Promise<{
        supplier_id: number;
        id: number;
        user_id: number;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string;
        expected_delivery_date: Date | null;
        order_date: Date;
        received_date: Date | null;
    }>;
    receivePurchaseOrder(id: number, data: ReceivePurchaseOrderInput): Promise<{
        suppliers: {
            name: string;
            id: number;
            email: string | null;
            is_active: boolean;
            phone: string | null;
            contact_name: string | null;
            lead_time_days: number | null;
        };
        items: {
            quantity: number;
            id: number;
            unit_cost: import("@prisma/client/runtime/library").Decimal;
            product_id: number;
            purchase_order_id: number;
        }[];
    } & {
        supplier_id: number;
        id: number;
        user_id: number;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string;
        expected_delivery_date: Date | null;
        order_date: Date;
        received_date: Date | null;
    }>;
    cancelPurchaseOrder(id: number): Promise<{
        supplier_id: number;
        id: number;
        user_id: number;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string;
        expected_delivery_date: Date | null;
        order_date: Date;
        received_date: Date | null;
    }>;
}
declare const _default: PurchaseOrderService;
export default _default;
//# sourceMappingURL=PurchaseOrderService.d.ts.map