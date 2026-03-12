const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'services', 'DashboardService.ts');
let content = fs.readFileSync(filePath, 'utf8');

const newGetSummary = `    async getSummary(): Promise<IDashboardSummary> {
        const now = new Date();
        const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
        const endOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

        const [salesAgg, appointmentsCount, rawCriticalStock, expiringBatches] = await Promise.all([
            prisma.sales.aggregate({
                _sum: { total_amount: true },
                where: {
                    status: 'completed',
                    sale_date: {
                        gte: startOfDayUTC,
                        lte: endOfDayUTC
                    }
                }
            }),
            prisma.appointments.count({
                where: {
                    status: 'SCHEDULED',
                    appointment_date: {
                        gte: startOfDayUTC,
                        lte: endOfDayUTC
                    }
                }
            }),
            prisma.batches.groupBy({
                by: ['product_id'],
                _sum: {
                    quantity: true
                }
            }),
            prisma.batches.findMany({
                where: {
                    expiry_date: { gte: startOfDayUTC },
                    quantity: { gt: 0 }
                },
                orderBy: { expiry_date: 'asc' },
                take: 5,
                include: {
                    products: { select: { name: true, suppliers: { select: { name: true } } } }
                }
            })
        ]);

        const criticalStockArray: IDashboardCriticalStock[] = [];
        const productIds = rawCriticalStock
            .map((item: any) => item.product_id)
            .filter((id: any): id is number => id !== null);

        const productsInfo = await prisma.products.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true, min_stock: true, suppliers: { select: { name: true } } }
        });
        const productMap = new Map(productsInfo.map(p => [p.id, p]));

        for (const item of rawCriticalStock) {
            if (item.product_id) {
                const p = productMap.get(item.product_id);
                if (p) {
                    const totalQuantity = Number(item._sum.quantity) || 0;
                    if (totalQuantity <= (p.min_stock ?? 10)) {
                        criticalStockArray.push({
                            productId: item.product_id,
                            productName: p.name || 'Producto Desconocido',
                            totalQuantity,
                            supplierName: p.suppliers?.name
                        });
                    }
                }
            }
        }

        const productsWithoutBatches = await prisma.products.findMany({
            where: { batches: { none: {} } },
            select: { id: true, name: true, min_stock: true, suppliers: { select: { name: true } } }
        });
        for (const p of productsWithoutBatches) {
             if (0 <= (p.min_stock ?? 10)) {
                 criticalStockArray.push({
                     productId: p.id,
                     productName: p.name,
                     totalQuantity: 0,
                     supplierName: p.suppliers?.name
                 });
             }
        }

        return {
            todaysSales: Number(salesAgg._sum.total_amount) || 0,
            todaysAppointments: appointmentsCount,
            criticalStock: criticalStockArray,
            expiringBatches: expiringBatches.map((batch: any) => ({
                id: batch.id,
                batchNumber: batch.batch_number,
                quantity: batch.quantity,
                expiryDate: batch.expiry_date.toISOString(),
                productName: batch.products?.name || 'Producto Desconocido',
                supplierName: batch.products?.suppliers?.name
            }))
        };
    }`;

// Replace the entire method using regex (from async getSummary() { to the end before getChartData)
content = content.replace(/async getSummary\(\): Promise<IDashboardSummary> \{[\s\S]*?\n    \}\n\n    \/\/ Datos para las gráficas del dashboard/m, newGetSummary + '\n\n    // Datos para las gráficas del dashboard');

fs.writeFileSync(filePath, content, 'utf8');
console.log('DashboardService updated successfully!');
