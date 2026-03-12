"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const PurchaseOrderService_1 = __importDefault(require("../PurchaseOrderService"));
const prisma_1 = __importDefault(require("../../config/prisma"));
// Mock the prisma client
vitest_1.vi.mock('../../config/prisma', () => ({
    default: {
        purchase_orders: {
            findMany: vitest_1.vi.fn(),
            findUnique: vitest_1.vi.fn(),
            create: vitest_1.vi.fn(),
            update: vitest_1.vi.fn(),
        },
        $transaction: vitest_1.vi.fn(),
        batches: {
            create: vitest_1.vi.fn(),
        }
    }
}));
(0, vitest_1.describe)('PurchaseOrderService', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    const mockOrder = {
        id: 1,
        supplier_id: 1,
        user_id: 1,
        status: 'PENDING',
        total_amount: 100,
        items: [
            { id: 10, purchase_order_id: 1, product_id: 5, quantity: 10, unit_cost: 10 }
        ]
    };
    (0, vitest_1.it)('should create a purchase order calculating total amount', async () => {
        const createData = {
            supplier_id: 1,
            user_id: 1,
            items: [
                { product_id: 5, quantity: 10, unit_cost: 10 }
            ]
        };
        prisma_1.default.purchase_orders.create.mockResolvedValue(mockOrder);
        const result = await PurchaseOrderService_1.default.createPurchaseOrder(createData);
        (0, vitest_1.expect)(result).toEqual(mockOrder);
        (0, vitest_1.expect)(prisma_1.default.purchase_orders.create).toHaveBeenCalledWith({
            data: {
                supplier_id: 1,
                user_id: 1,
                status: 'PENDING',
                total_amount: 100,
                items: {
                    create: [
                        { product_id: 5, quantity: 10, unit_cost: 10 }
                    ]
                }
            },
            include: { items: true, suppliers: true }
        });
    });
    (0, vitest_1.it)('should receive a purchase order in a transaction', async () => {
        prisma_1.default.purchase_orders.findUnique.mockResolvedValue(mockOrder);
        prisma_1.default.$transaction.mockImplementation(async (callback) => {
            const tx = {
                purchase_orders: prisma_1.default.purchase_orders,
                batches: prisma_1.default.batches
            };
            return callback(tx);
        });
        prisma_1.default.purchase_orders.update.mockResolvedValue({ ...mockOrder, status: 'RECEIVED' });
        const payload = {
            items: [
                { purchase_order_item_id: 10, batch_number: 'LOTE1', expiry_date: '2027-12-31' }
            ]
        };
        const result = await PurchaseOrderService_1.default.receivePurchaseOrder(1, payload);
        (0, vitest_1.expect)(result.status).toBe('RECEIVED');
        (0, vitest_1.expect)(prisma_1.default.purchase_orders.update).toHaveBeenCalled();
        (0, vitest_1.expect)(prisma_1.default.batches.create).toHaveBeenCalledWith({
            data: vitest_1.expect.objectContaining({
                product_id: 5,
                batch_number: 'LOTE1',
                quantity: 10,
                unit_cost: 10
            })
        });
    });
    (0, vitest_1.it)('should throw error if order already received', async () => {
        prisma_1.default.purchase_orders.findUnique.mockResolvedValue({ ...mockOrder, status: 'RECEIVED' });
        await (0, vitest_1.expect)(PurchaseOrderService_1.default.receivePurchaseOrder(1, { items: [] })).rejects.toThrow('La orden de compra ya fue recibida');
    });
    (0, vitest_1.it)('should cancel a pending purchase order', async () => {
        prisma_1.default.purchase_orders.findUnique.mockResolvedValue(mockOrder);
        prisma_1.default.purchase_orders.update.mockResolvedValue({ ...mockOrder, status: 'CANCELLED' });
        const result = await PurchaseOrderService_1.default.cancelPurchaseOrder(1);
        (0, vitest_1.expect)(result.status).toBe('CANCELLED');
        (0, vitest_1.expect)(prisma_1.default.purchase_orders.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { status: 'CANCELLED' }
        });
    });
});
//# sourceMappingURL=PurchaseOrderService.test.js.map