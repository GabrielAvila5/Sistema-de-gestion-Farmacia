import { CreateSaleInput } from '../validators/sale.validator';
import { Prisma } from '@prisma/client';
declare class SaleService {
    /**
     * Crea una nueva transacción de venta.
     * Usa prisma.$transaction() para garantizar atomicidad (todo o nada).
     *
     * Lógica FEFO (First Expired, First Out):
     * Para cada ítem de la venta, busca los lotes del producto ordenados por
     * fecha de caducidad ascendente y descuenta del lote más próximo a caducar.
     * Si un lote no tiene suficiente stock, pasa al siguiente lote.
     */
    createSale(saleData: CreateSaleInput): Promise<{
        sale_items: ({
            batches: {
                batch_number: string;
                quantity: number;
                expiry_date: Date;
                promo_price: Prisma.Decimal | null;
                location: string | null;
                id: number;
                unit_cost: Prisma.Decimal | null;
                product_id: number | null;
            } | null;
        } & {
            quantity: number;
            id: number;
            price_at_sale: Prisma.Decimal;
            sale_id: number | null;
            batch_id: number | null;
        })[];
        users: {
            name: string;
            id: number;
            email: string;
        } | null;
    } & {
        id: number;
        user_id: number | null;
        payment_method: string;
        amount_paid: Prisma.Decimal | null;
        sale_date: Date | null;
        total_amount: Prisma.Decimal;
        status: string;
    }>;
    getAllSales(): Promise<({
        sale_items: ({
            batches: ({
                products: {
                    name: string;
                    category: string | null;
                    id: number;
                    sku: string;
                } | null;
            } & {
                batch_number: string;
                quantity: number;
                expiry_date: Date;
                promo_price: Prisma.Decimal | null;
                location: string | null;
                id: number;
                unit_cost: Prisma.Decimal | null;
                product_id: number | null;
            }) | null;
        } & {
            quantity: number;
            id: number;
            price_at_sale: Prisma.Decimal;
            sale_id: number | null;
            batch_id: number | null;
        })[];
        users: {
            name: string;
            id: number;
            email: string;
        } | null;
    } & {
        id: number;
        user_id: number | null;
        payment_method: string;
        amount_paid: Prisma.Decimal | null;
        sale_date: Date | null;
        total_amount: Prisma.Decimal;
        status: string;
    })[]>;
    getSaleById(id: number): Promise<{
        sale_items: ({
            batches: ({
                products: {
                    name: string;
                    base_price: Prisma.Decimal;
                    category: string | null;
                    id: number;
                    sku: string;
                } | null;
            } & {
                batch_number: string;
                quantity: number;
                expiry_date: Date;
                promo_price: Prisma.Decimal | null;
                location: string | null;
                id: number;
                unit_cost: Prisma.Decimal | null;
                product_id: number | null;
            }) | null;
        } & {
            quantity: number;
            id: number;
            price_at_sale: Prisma.Decimal;
            sale_id: number | null;
            batch_id: number | null;
        })[];
        users: {
            name: string;
            id: number;
            email: string;
        } | null;
    } & {
        id: number;
        user_id: number | null;
        payment_method: string;
        amount_paid: Prisma.Decimal | null;
        sale_date: Date | null;
        total_amount: Prisma.Decimal;
        status: string;
    }>;
    /**
     * Anula una venta y revierte el stock a los lotes correspondientes
     */
    voidSale(saleId: number): Promise<{
        sale_items: ({
            batches: ({
                products: {
                    name: string;
                    id: number;
                    sku: string;
                } | null;
            } & {
                batch_number: string;
                quantity: number;
                expiry_date: Date;
                promo_price: Prisma.Decimal | null;
                location: string | null;
                id: number;
                unit_cost: Prisma.Decimal | null;
                product_id: number | null;
            }) | null;
        } & {
            quantity: number;
            id: number;
            price_at_sale: Prisma.Decimal;
            sale_id: number | null;
            batch_id: number | null;
        })[];
        users: {
            name: string;
            id: number;
            email: string;
        } | null;
    } & {
        id: number;
        user_id: number | null;
        payment_method: string;
        amount_paid: Prisma.Decimal | null;
        sale_date: Date | null;
        total_amount: Prisma.Decimal;
        status: string;
    }>;
}
declare const _default: SaleService;
export default _default;
//# sourceMappingURL=SaleService.d.ts.map