"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
class PurchaseOrderService {
    async getAllPurchaseOrders() {
        return prisma_1.default.purchase_orders.findMany({
            include: {
                suppliers: true,
                users: {
                    select: { id: true, name: true }
                },
                items: {
                    include: {
                        products: true
                    }
                }
            },
            orderBy: { order_date: 'desc' }
        });
    }
    async getPurchaseOrderById(id) {
        const order = await prisma_1.default.purchase_orders.findUnique({
            where: { id },
            include: {
                suppliers: true,
                users: {
                    select: { id: true, name: true }
                },
                items: {
                    include: {
                        products: true
                    }
                }
            }
        });
        if (!order)
            throw new Error('Orden de compra no encontrada');
        return order;
    }
    async createPurchaseOrder(data) {
        const total_amount = data.items.reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0);
        return prisma_1.default.purchase_orders.create({
            data: {
                supplier_id: data.supplier_id,
                user_id: data.user_id,
                status: 'PENDING',
                total_amount,
                expected_delivery_date: data.expected_delivery_date ? new Date(data.expected_delivery_date) : null,
                items: {
                    create: data.items.map(item => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                        unit_cost: item.unit_cost
                    }))
                }
            },
            include: {
                items: true,
                suppliers: true
            }
        });
    }
    async updateExpectedDate(id, expected_delivery_date) {
        const order = await prisma_1.default.purchase_orders.findUnique({ where: { id } });
        if (!order)
            throw new Error('Orden de compra no encontrada');
        if (order.status !== 'PENDING')
            throw new Error('Solo se puede modificar la fecha de entrega de órdenes pendientes');
        return prisma_1.default.purchase_orders.update({
            where: { id },
            data: {
                expected_delivery_date: expected_delivery_date ? new Date(expected_delivery_date) : null
            }
        });
    }
    async receivePurchaseOrder(id, data) {
        const order = await prisma_1.default.purchase_orders.findUnique({
            where: { id },
            include: { items: true }
        });
        if (!order)
            throw new Error('Orden de compra no encontrada');
        if (order.status === 'RECEIVED')
            throw new Error('La orden de compra ya fue recibida');
        if (order.status === 'CANCELLED')
            throw new Error('La orden de compra está cancelada');
        return await prisma_1.default.$transaction(async (tx) => {
            // Actualizar el estado de la orden
            const updatedOrder = await tx.purchase_orders.update({
                where: { id },
                data: {
                    status: 'RECEIVED',
                    received_date: new Date()
                },
                include: {
                    items: true,
                    suppliers: true
                }
            });
            // Para cada ítem recibido, crear un nuevo lote (batch) en el inventario
            for (const receivedItem of data.items) {
                const orderItem = order.items.find(i => i.id === receivedItem.purchase_order_item_id);
                if (!orderItem) {
                    throw new Error(`Ítem de orden ${receivedItem.purchase_order_item_id} no válido para esta orden`);
                }
                const newBatch = await tx.batches.create({
                    data: {
                        product_id: orderItem.product_id,
                        batch_number: receivedItem.batch_number,
                        quantity: orderItem.quantity,
                        expiry_date: new Date(receivedItem.expiry_date),
                        unit_cost: orderItem.unit_cost,
                        location: receivedItem.location || null
                    }
                });
                await tx.inventory_movements.create({
                    data: {
                        batch_id: newBatch.id,
                        user_id: order.user_id,
                        movement_type: 'PURCHASE_RECEIPT',
                        quantity: orderItem.quantity,
                        notes: `Recepción OC-${order.id}`,
                    }
                });
            }
            return updatedOrder;
        });
    }
    async cancelPurchaseOrder(id) {
        const order = await prisma_1.default.purchase_orders.findUnique({
            where: { id }
        });
        if (!order)
            throw new Error('Orden de compra no encontrada');
        if (order.status === 'RECEIVED')
            throw new Error('No se puede cancelar una orden ya recibida');
        return prisma_1.default.purchase_orders.update({
            where: { id },
            data: {
                status: 'CANCELLED'
            }
        });
    }
}
exports.default = new PurchaseOrderService();
//# sourceMappingURL=PurchaseOrderService.js.map