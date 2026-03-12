import { CreateProductInput, UpdateProductInput } from '../validators/product.validator';
declare class ProductService {
    /**
     * Genera un SKU único de 8 caracteres usando nanoid.
     * Prefijo "PRD-" + 8 caracteres alfanuméricos.
     */
    private generateSku;
    /**
     * Crea un nuevo producto con SKU generado automáticamente.
     * Si se envían lotes (batches), se crean anidados junto al producto.
     */
    createProduct(data: CreateProductInput): Promise<{
        batches: {
            batch_number: string;
            quantity: number;
            expiry_date: Date;
            promo_price: import("@prisma/client/runtime/library").Decimal | null;
            location: string | null;
            id: number;
            unit_cost: import("@prisma/client/runtime/library").Decimal | null;
            product_id: number | null;
        }[];
    } & {
        name: string;
        description: string | null;
        base_price: import("@prisma/client/runtime/library").Decimal;
        category: string | null;
        brand: string | null;
        supplier_id: number | null;
        min_stock: number;
        id: number;
        sku: string;
    }>;
    /**
     * Obtiene todos los productos con sus lotes.
     */
    getAllProducts(): Promise<({
        batches: {
            batch_number: string;
            quantity: number;
            expiry_date: Date;
            promo_price: import("@prisma/client/runtime/library").Decimal | null;
            location: string | null;
            id: number;
            unit_cost: import("@prisma/client/runtime/library").Decimal | null;
            product_id: number | null;
        }[];
        suppliers: {
            name: string;
            id: number;
            email: string | null;
            is_active: boolean;
            phone: string | null;
            contact_name: string | null;
            lead_time_days: number | null;
        } | null;
    } & {
        name: string;
        description: string | null;
        base_price: import("@prisma/client/runtime/library").Decimal;
        category: string | null;
        brand: string | null;
        supplier_id: number | null;
        min_stock: number;
        id: number;
        sku: string;
    })[]>;
    /**
     * Busca productos por nombre para sugerir medicamentos con stock en consultas.
     */
    searchProducts(query: string): Promise<{
        id: number;
        sku: string;
        name: string;
        totalStock: number;
    }[]>;
    /**
     * Obtiene un producto por su ID.
     */
    getProductById(id: number): Promise<{
        batches: {
            batch_number: string;
            quantity: number;
            expiry_date: Date;
            promo_price: import("@prisma/client/runtime/library").Decimal | null;
            location: string | null;
            id: number;
            unit_cost: import("@prisma/client/runtime/library").Decimal | null;
            product_id: number | null;
        }[];
        suppliers: {
            name: string;
            id: number;
            email: string | null;
            is_active: boolean;
            phone: string | null;
            contact_name: string | null;
            lead_time_days: number | null;
        } | null;
    } & {
        name: string;
        description: string | null;
        base_price: import("@prisma/client/runtime/library").Decimal;
        category: string | null;
        brand: string | null;
        supplier_id: number | null;
        min_stock: number;
        id: number;
        sku: string;
    }>;
    /**
     * Actualiza un producto por su ID.
     */
    updateProduct(id: number, data: UpdateProductInput): Promise<{
        batches: {
            batch_number: string;
            quantity: number;
            expiry_date: Date;
            promo_price: import("@prisma/client/runtime/library").Decimal | null;
            location: string | null;
            id: number;
            unit_cost: import("@prisma/client/runtime/library").Decimal | null;
            product_id: number | null;
        }[];
    } & {
        name: string;
        description: string | null;
        base_price: import("@prisma/client/runtime/library").Decimal;
        category: string | null;
        brand: string | null;
        supplier_id: number | null;
        min_stock: number;
        id: number;
        sku: string;
    }>;
    /**
     * Elimina un producto por su ID.
     */
    deleteProduct(id: number): Promise<{
        message: string;
    }>;
}
declare const _default: ProductService;
export default _default;
//# sourceMappingURL=ProductService.d.ts.map