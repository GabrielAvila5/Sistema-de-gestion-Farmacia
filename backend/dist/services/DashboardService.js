"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Servicio que encapsula la lógica de negocio y consultas a la base de datos para la entidad de Dashboard.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const prisma_1 = __importDefault(require("../config/prisma"));
class DashboardService {
    async getSummary() {
        // Manejo estricto de UTC para "Hoy"
        const now = new Date();
        const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
        const endOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));
        // Promise.all para concurrencia máxima y rapidez
        const [salesAgg, appointmentsCount, rawCriticalStock, expiringBatches] = await Promise.all([
            // 1. Suma de ingresos por ventas HOY (solo completadas)
            prisma_1.default.sales.aggregate({
                _sum: { total_amount: true },
                where: {
                    status: 'completed',
                    sale_date: {
                        gte: startOfDayUTC,
                        lte: endOfDayUTC
                    }
                }
            }),
            // 2. Conteo de citas "SCHEDULED" HOY
            prisma_1.default.appointments.count({
                where: {
                    status: 'SCHEDULED',
                    appointment_date: {
                        gte: startOfDayUTC,
                        lte: endOfDayUTC
                    }
                }
            }),
            // 3. Stock Crítico usando Prisma groupBy
            // Agrupa todos los lotes por producto, suma su stock, y filtra si el total aglomerado es menor a 15
            prisma_1.default.batches.groupBy({
                by: ['product_id'],
                _sum: {
                    quantity: true
                },
                having: {
                    quantity: {
                        _sum: {
                            lt: 15
                        }
                    }
                }
            }),
            // 4. Lotes Próximos a Caducar (Top 5 con fecha futura ordenados por cercanía)
            prisma_1.default.batches.findMany({
                where: {
                    expiry_date: { gte: startOfDayUTC },
                    quantity: { gt: 0 } // Solo considerar lotes que no estén vacíos
                },
                orderBy: { expiry_date: 'asc' },
                take: 5,
                include: {
                    products: { select: { name: true } }
                }
            })
        ]);
        // Mapeo Adicional para Stock Crítico (Traer los nombres de los productos)
        const criticalStockArray = [];
        if (rawCriticalStock.length > 0) {
            // Obtenemos un array de los IDs de producto críticos
            // Prisma infiere product_id como number | null, limpiamos los nulls (aunque relacionalmente no debería haber)
            const productIds = rawCriticalStock
                .map((item) => item.product_id)
                .filter((id) => id !== null);
            // Buscamos los nombres
            const productsInfo = await prisma_1.default.products.findMany({
                where: { id: { in: productIds } },
                select: { id: true, name: true }
            });
            const productMap = new Map(productsInfo.map(p => [p.id, p.name]));
            for (const item of rawCriticalStock) {
                if (item.product_id) {
                    criticalStockArray.push({
                        productId: item.product_id,
                        productName: productMap.get(item.product_id) || 'Producto Desconocido',
                        totalQuantity: Number(item._sum.quantity) || 0
                    });
                }
            }
        }
        // Formateo Seguro
        return {
            todaysSales: Number(salesAgg._sum.total_amount) || 0,
            todaysAppointments: appointmentsCount,
            criticalStock: criticalStockArray,
            expiringBatches: expiringBatches.map((batch) => ({
                id: batch.id,
                batchNumber: batch.batch_number,
                quantity: batch.quantity,
                expiryDate: batch.expiry_date.toISOString(),
                productName: batch.products?.name || 'Producto Desconocido',
            }))
        };
    }
    // Datos para las gráficas del dashboard
    async getChartData() {
        const now = new Date();
        // Últimos 7 días
        const sevenDaysAgo = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 6, 0, 0, 0, 0));
        // Traer todas las ventas COMPLETADAS de los últimos 7 días con sus items y productos
        const recentSales = await prisma_1.default.sales.findMany({
            where: {
                status: 'completed',
                sale_date: { gte: sevenDaysAgo },
            },
            include: {
                sale_items: {
                    include: {
                        batches: {
                            include: {
                                products: {
                                    select: { category: true },
                                },
                            },
                        },
                    },
                },
            },
        });
        // --- Ventas por día (últimos 7 días) ---
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const dailySales = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
            const dayStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
            const dayEnd = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));
            const dayTotal = recentSales
                .filter(s => s.sale_date && s.sale_date >= dayStart && s.sale_date <= dayEnd)
                .reduce((sum, s) => sum + Number(s.total_amount), 0);
            dailySales.push({
                day: dayNames[date.getUTCDay()],
                total: Math.round(dayTotal * 100) / 100,
            });
        }
        // --- Ventas por categoría ---
        const categoryMap = new Map();
        for (const sale of recentSales) {
            for (const item of sale.sale_items) {
                const category = item.batches?.products?.category || 'Sin categoría';
                const amount = Number(item.price_at_sale) * item.quantity;
                categoryMap.set(category, (categoryMap.get(category) || 0) + amount);
            }
        }
        const salesByCategory = Array.from(categoryMap.entries()).map(([name, value]) => ({
            name,
            value: Math.round(value * 100) / 100,
        }));
        // --- Distribución por método de pago ---
        const paymentMethodMap = new Map();
        const methodLabels = { cash: 'Efectivo', card: 'Tarjeta' };
        for (const sale of recentSales) {
            const method = sale.payment_method || 'cash';
            const label = methodLabels[method] || method;
            const amount = Number(sale.total_amount);
            paymentMethodMap.set(label, (paymentMethodMap.get(label) || 0) + amount);
        }
        const salesByPaymentMethod = Array.from(paymentMethodMap.entries()).map(([name, value]) => ({
            name,
            value: Math.round(value * 100) / 100,
        }));
        return {
            dailySales,
            salesByCategory,
            salesByPaymentMethod,
        };
    }
}
exports.default = new DashboardService();
//# sourceMappingURL=DashboardService.js.map