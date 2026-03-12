"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Pruebas unitarias para SaleService.
 * Comprueba que el inventario se descuente bajo la regla FEFO y verifique las divisas.
 */
const vitest_1 = require("vitest");
const SaleService_1 = __importDefault(require("../SaleService"));
// Mocks del Transation Client (tx)
const tx = {
    users: { findUnique: vitest_1.vi.fn() },
    products: { findUnique: vitest_1.vi.fn() },
    batches: { findMany: vitest_1.vi.fn(), update: vitest_1.vi.fn() },
    sales: { create: vitest_1.vi.fn(), update: vitest_1.vi.fn() },
    sale_items: { create: vitest_1.vi.fn() },
};
vitest_1.vi.mock('../../config/prisma', () => ({
    default: {
        $transaction: vitest_1.vi.fn(async (cb) => {
            return cb(tx);
        })
    }
}));
(0, vitest_1.describe)('SaleService - createSale() [FEFO Logic]', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('Debería descontar stock correctamente priorizando el lote que caduca primero (FEFO)', async () => {
        // Mock DB responses
        tx.users.findUnique.mockResolvedValue({ id: 1, name: 'Vendedor 1' });
        tx.sales.create.mockResolvedValue({ id: 100 });
        tx.products.findUnique.mockResolvedValue({ id: 1, base_price: 50, name: 'Paracetamol' });
        // Simulamos dos lotes:
        // Lote A: caduca en 2026, cantidad: 5
        // Lote B: caduca en 2027, cantidad: 10
        // Compra: 8 unidades.
        // FEFO: Debería gastar los 5 del Lote A y 3 del Lote B.
        tx.batches.findMany.mockResolvedValue([
            { id: 10, quantity: 5, promo_price: null }, // Vence primero
            { id: 11, quantity: 10, promo_price: null } // Vence después
        ]);
        tx.sales.update.mockResolvedValue({ id: 100, total_amount: 400 });
        const saleData = {
            user_id: 1,
            payment_method: 'card',
            amount_paid: 400,
            items: [
                { product_id: 1, quantity: 8 }
            ]
        };
        await SaleService_1.default.createSale(saleData);
        // Verificamos que se actualizaran 2 lotes (gastó el lote completo A y parcial de B)
        (0, vitest_1.expect)(tx.batches.update).toHaveBeenCalledTimes(2);
        // Lote A gastado por completo: quedan 0
        (0, vitest_1.expect)(tx.batches.update).toHaveBeenNthCalledWith(1, {
            where: { id: 10 },
            data: { quantity: 0 }
        });
        // Lote B gastado parcialmente: quedan 10 - 3 = 7
        (0, vitest_1.expect)(tx.batches.update).toHaveBeenNthCalledWith(2, {
            where: { id: 11 },
            data: { quantity: 7 }
        });
        // Verificamos que se crearon los dos items de venta vinculados a cada lote
        (0, vitest_1.expect)(tx.sale_items.create).toHaveBeenCalledTimes(2);
        (0, vitest_1.expect)(tx.sale_items.create).toHaveBeenNthCalledWith(1, {
            data: { sale_id: 100, batch_id: 10, quantity: 5, price_at_sale: 50 }
        });
        (0, vitest_1.expect)(tx.sale_items.create).toHaveBeenNthCalledWith(2, {
            data: { sale_id: 100, batch_id: 11, quantity: 3, price_at_sale: 50 }
        });
    });
    (0, vitest_1.it)('Debería arrojar error si el monto pagado en efectivo es menor al total', async () => {
        tx.users.findUnique.mockResolvedValue({ id: 1 });
        tx.sales.create.mockResolvedValue({ id: 100 });
        tx.products.findUnique.mockResolvedValue({ id: 1, base_price: 50 });
        tx.batches.findMany.mockResolvedValue([{ id: 10, quantity: 10, promo_price: null }]);
        const saleData = {
            user_id: 1,
            payment_method: 'cash',
            amount_paid: 20, // Pagó $20 pero es un prod de $50
            items: [{ product_id: 1, quantity: 1 }]
        };
        await (0, vitest_1.expect)(SaleService_1.default.createSale(saleData)).rejects.toThrow(/Monto recibido insuficiente/);
    });
    (0, vitest_1.it)('Debería arrojar error si no hay stock suficiente sumando los lotes', async () => {
        tx.users.findUnique.mockResolvedValue({ id: 1 });
        tx.sales.create.mockResolvedValue({ id: 100 });
        tx.products.findUnique.mockResolvedValue({ id: 1, base_price: 50 });
        // Suma inventario: 2. Pide: 5
        tx.batches.findMany.mockResolvedValue([{ id: 10, quantity: 2, promo_price: null }]);
        const saleData = {
            user_id: 1,
            payment_method: 'card',
            amount_paid: 250,
            items: [{ product_id: 1, quantity: 5 }]
        };
        await (0, vitest_1.expect)(SaleService_1.default.createSale(saleData)).rejects.toThrow(/Stock insuficiente/);
    });
});
//# sourceMappingURL=SaleService.test.js.map