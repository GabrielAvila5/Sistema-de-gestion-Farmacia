"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const StockService_1 = __importDefault(require("../StockService"));
const prisma_1 = __importDefault(require("../../config/prisma"));
// Mock del Prisma Client
vitest_1.vi.mock('../../config/prisma', () => ({
    default: {
        $transaction: vitest_1.vi.fn(),
        inventory_movements: {
            findMany: vitest_1.vi.fn(),
            create: vitest_1.vi.fn(),
        },
        products: {
            findUnique: vitest_1.vi.fn(),
            update: vitest_1.vi.fn(),
        },
        batches: {
            create: vitest_1.vi.fn(),
        }
    }
}));
(0, vitest_1.describe)('StockService - quickRestock()', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        // Simular ejecución manual del callback de transacción
        prisma_1.default.$transaction.mockImplementation(async (callback) => {
            return callback(prisma_1.default);
        });
    });
    (0, vitest_1.it)('Debería arrojar error si el producto no existe', async () => {
        prisma_1.default.products.findUnique.mockResolvedValue(null);
        await (0, vitest_1.expect)(StockService_1.default.quickRestock({
            product_id: 999,
            quantity: 10,
            batch_number: 'LOTE01',
            expiry_date: new Date(),
            unit_cost: 50,
            user_id: 1
        })).rejects.toThrow('Producto no encontrado');
    });
    (0, vitest_1.it)('Debería registrar el lote y el movimiento de inventario correctamente', async () => {
        const mockProduct = { id: 1, name: 'Paracetamol', base_price: 100 };
        const mockBatch = { id: 10, product_id: 1, quantity: 50, unit_cost: 60 };
        const mockMovement = { id: 5, batch_id: 10, movement_type: 'DIRECT_ENTRY', quantity: 50 };
        prisma_1.default.products.findUnique.mockResolvedValue(mockProduct);
        prisma_1.default.batches.create.mockResolvedValue(mockBatch);
        prisma_1.default.inventory_movements.create.mockResolvedValue(mockMovement);
        const result = await StockService_1.default.quickRestock({
            product_id: 1,
            quantity: 50,
            batch_number: 'L2024TEST',
            expiry_date: new Date('2025-12-31'),
            unit_cost: 60,
            notes: 'Donación',
            user_id: 2
        });
        // Verificar llamadas de base de datos
        (0, vitest_1.expect)(prisma_1.default.batches.create).toHaveBeenCalledWith({
            data: vitest_1.expect.objectContaining({
                product_id: 1,
                batch_number: 'L2024TEST',
                quantity: 50,
                unit_cost: 60
            })
        });
        (0, vitest_1.expect)(prisma_1.default.inventory_movements.create).toHaveBeenCalledWith({
            data: vitest_1.expect.objectContaining({
                batch_id: 10,
                user_id: 2,
                movement_type: 'DIRECT_ENTRY',
                quantity: 50,
                notes: 'Donación'
            })
        });
        // Costo(60) < BasePrice(100), no debería hacer update del precio
        (0, vitest_1.expect)(prisma_1.default.products.update).not.toHaveBeenCalled();
        (0, vitest_1.expect)(result.priceUpdated).toBe(false);
    });
    (0, vitest_1.it)('Debería sugerir incrementar base_price si el unit_cost es mayor o igual', async () => {
        const mockProduct = { id: 2, name: 'Aspirina', base_price: 20 };
        const mockBatch = { id: 11, product_id: 2, quantity: 10, unit_cost: 25 }; // Costo subió
        prisma_1.default.products.findUnique.mockResolvedValue(mockProduct);
        prisma_1.default.batches.create.mockResolvedValue(mockBatch);
        prisma_1.default.products.update.mockResolvedValue({ ...mockProduct, base_price: 32.5 });
        const result = await StockService_1.default.quickRestock({
            product_id: 2,
            quantity: 10,
            batch_number: 'L2024HIGH',
            expiry_date: new Date('2025-01-01'),
            unit_cost: 25, // 25 >= 20, dispara el trigger
            user_id: 1
        });
        // Debería calcular 25 * 1.30 = 32.5
        (0, vitest_1.expect)(prisma_1.default.products.update).toHaveBeenCalledWith({
            where: { id: 2 },
            data: { base_price: 32.5 }
        });
        (0, vitest_1.expect)(result.priceUpdated).toBe(true);
        (0, vitest_1.expect)(result.newBasePrice).toBeCloseTo(32.5, 1);
    });
});
//# sourceMappingURL=StockService.test.js.map