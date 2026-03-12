"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const SupplierService_1 = __importDefault(require("../SupplierService"));
const prisma_1 = __importDefault(require("../../config/prisma"));
// Mock the prisma client
vitest_1.vi.mock('../../config/prisma', () => ({
    default: {
        suppliers: {
            findMany: vitest_1.vi.fn(),
            findUnique: vitest_1.vi.fn(),
            create: vitest_1.vi.fn(),
            update: vitest_1.vi.fn(),
            delete: vitest_1.vi.fn(),
        },
        products: {
            count: vitest_1.vi.fn(),
        },
        purchase_orders: {
            count: vitest_1.vi.fn(),
        }
    }
}));
(0, vitest_1.describe)('SupplierService', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    const mockSupplier = {
        id: 1,
        name: 'Test Supplier',
        contact_name: 'John Doe',
        phone: '123456789',
        email: 'test@supplier.com',
        lead_time_days: 5
    };
    (0, vitest_1.it)('should get all suppliers', async () => {
        prisma_1.default.suppliers.findMany.mockResolvedValue([mockSupplier]);
        const result = await SupplierService_1.default.getAllSuppliers();
        (0, vitest_1.expect)(result).toHaveLength(1);
        (0, vitest_1.expect)(result[0]).toEqual(mockSupplier);
        (0, vitest_1.expect)(prisma_1.default.suppliers.findMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
    });
    (0, vitest_1.it)('should create a supplier', async () => {
        prisma_1.default.suppliers.create.mockResolvedValue(mockSupplier);
        const data = { name: 'Test Supplier', lead_time_days: 5 };
        const result = await SupplierService_1.default.createSupplier(data);
        (0, vitest_1.expect)(result).toEqual(mockSupplier);
        (0, vitest_1.expect)(prisma_1.default.suppliers.create).toHaveBeenCalledWith({ data });
    });
    (0, vitest_1.it)('should get a supplier by id', async () => {
        prisma_1.default.suppliers.findUnique.mockResolvedValue(mockSupplier);
        const result = await SupplierService_1.default.getSupplierById(1);
        (0, vitest_1.expect)(result).toEqual(mockSupplier);
        (0, vitest_1.expect)(prisma_1.default.suppliers.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    (0, vitest_1.it)('should throw error if supplier not found by id', async () => {
        prisma_1.default.suppliers.findUnique.mockResolvedValue(null);
        await (0, vitest_1.expect)(SupplierService_1.default.getSupplierById(99)).rejects.toThrow('Proveedor no encontrado');
    });
    (0, vitest_1.it)('should update a supplier', async () => {
        prisma_1.default.suppliers.findUnique.mockResolvedValue(mockSupplier);
        prisma_1.default.suppliers.update.mockResolvedValue({ ...mockSupplier, name: 'Updated' });
        const data = { name: 'Updated' };
        const result = await SupplierService_1.default.updateSupplier(1, data);
        (0, vitest_1.expect)(result.name).toBe('Updated');
        (0, vitest_1.expect)(prisma_1.default.suppliers.update).toHaveBeenCalledWith({ where: { id: 1 }, data });
    });
    (0, vitest_1.it)('should delete a supplier if no products or orders exist', async () => {
        prisma_1.default.suppliers.findUnique.mockResolvedValue(mockSupplier);
        prisma_1.default.products.count.mockResolvedValue(0);
        prisma_1.default.purchase_orders.count.mockResolvedValue(0);
        prisma_1.default.suppliers.delete.mockResolvedValue(mockSupplier);
        const result = await SupplierService_1.default.deleteSupplier(1);
        (0, vitest_1.expect)(result).toEqual(mockSupplier);
        (0, vitest_1.expect)(prisma_1.default.suppliers.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    (0, vitest_1.it)('should prevent deletion if products exist', async () => {
        prisma_1.default.suppliers.findUnique.mockResolvedValue(mockSupplier);
        prisma_1.default.products.count.mockResolvedValue(1);
        await (0, vitest_1.expect)(SupplierService_1.default.deleteSupplier(1)).rejects.toThrow('No se puede eliminar un proveedor asociado a productos');
        (0, vitest_1.expect)(prisma_1.default.suppliers.delete).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=SupplierService.test.js.map