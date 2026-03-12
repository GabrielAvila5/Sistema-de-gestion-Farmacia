"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
class SupplierService {
    async getAllSuppliers() {
        return prisma_1.default.suppliers.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { purchase_orders: true }
                }
            }
        });
    }
    async getSupplierById(id) {
        const supplier = await prisma_1.default.suppliers.findUnique({ where: { id } });
        if (!supplier)
            throw new Error('Proveedor no encontrado');
        return supplier;
    }
    async createSupplier(data) {
        return prisma_1.default.suppliers.create({ data });
    }
    async updateSupplier(id, data) {
        const existing = await prisma_1.default.suppliers.findUnique({ where: { id } });
        if (!existing)
            throw new Error('Proveedor no encontrado');
        return prisma_1.default.suppliers.update({
            where: { id },
            data
        });
    }
    async updateSupplierStatus(id, is_active) {
        const existing = await prisma_1.default.suppliers.findUnique({ where: { id } });
        if (!existing)
            throw new Error('Proveedor no encontrado');
        return prisma_1.default.suppliers.update({
            where: { id },
            data: { is_active }
        });
    }
    async deleteSupplier(id) {
        const existing = await prisma_1.default.suppliers.findUnique({ where: { id } });
        if (!existing)
            throw new Error('Proveedor no encontrado');
        const productsCount = await prisma_1.default.products.count({ where: { supplier_id: id } });
        if (productsCount > 0)
            throw new Error('No se puede eliminar un proveedor asociado a productos');
        const ordersCount = await prisma_1.default.purchase_orders.count({ where: { supplier_id: id } });
        if (ordersCount > 0)
            throw new Error('No se puede eliminar un proveedor con órdenes de compra');
        return prisma_1.default.suppliers.delete({ where: { id } });
    }
}
exports.default = new SupplierService();
//# sourceMappingURL=SupplierService.js.map