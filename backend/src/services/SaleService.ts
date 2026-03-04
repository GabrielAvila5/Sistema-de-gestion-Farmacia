import prisma from '../config/prisma';
import { CreateSaleInput } from '../validators/sale.validator';
import { Prisma } from '@prisma/client';

// Servicio que encapsula la lógica de negocio de las ventas
class SaleService {
    /**
     * Crea una nueva transacción de venta.
     * Usa prisma.$transaction() para garantizar atomicidad (todo o nada).
     * 
     * Lógica FEFO (First Expired, First Out):
     * Para cada ítem de la venta, busca los lotes del producto ordenados por
     * fecha de caducidad ascendente y descuenta del lote más próximo a caducar.
     * Si un lote no tiene suficiente stock, pasa al siguiente lote.
     */
    async createSale(saleData: CreateSaleInput) {
        return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const { user_id, items } = saleData;
            let totalAmount = 0;

            // Verifica que el usuario existe
            const user = await tx.users.findUnique({ where: { id: user_id } });
            if (!user) {
                throw new Error(`Usuario no encontrado: ${user_id}`);
            }

            // Crea el registro de venta primero (se actualizará el total al final)
            const sale = await tx.sales.create({
                data: {
                    user_id,
                    total_amount: 0, // Se actualizará después
                },
            });

            // Procesa cada artículo de la venta
            for (const item of items) {
                // Busca el producto para obtener su precio base
                const product = await tx.products.findUnique({
                    where: { id: item.product_id },
                });

                if (!product) {
                    throw new Error(`Producto no encontrado: ${item.product_id}`);
                }

                // Busca los lotes del producto ordenados por fecha de caducidad (FEFO)
                const batches = await tx.batches.findMany({
                    where: {
                        product_id: item.product_id,
                        quantity: { gt: 0 }, // Solo lotes con stock disponible
                    },
                    orderBy: {
                        expiry_date: 'asc', // El más próximo a caducar primero
                    },
                });

                // Calcula el stock total disponible en todos los lotes
                const totalStock = batches.reduce((sum: number, b: { quantity: number }) => sum + b.quantity, 0);
                if (totalStock < item.quantity) {
                    throw new Error(
                        `Stock insuficiente para producto "${product.name}". ` +
                        `Disponible: ${totalStock}, Solicitado: ${item.quantity}`
                    );
                }

                // Descuenta el stock lote por lote (FEFO)
                let remainingQty = item.quantity;

                for (const batch of batches) {
                    if (remainingQty <= 0) break;

                    // Calcula cuánto descontar de este lote
                    const deductFromBatch = Math.min(batch.quantity, remainingQty);

                    // Actualiza el stock del lote
                    await tx.batches.update({
                        where: { id: batch.id },
                        data: { quantity: batch.quantity - deductFromBatch },
                    });

                    // Usa el precio promocional del lote si existe, sino el precio base del producto
                    const priceAtSale = batch.promo_price
                        ? Number(batch.promo_price)
                        : Number(product.base_price);

                    // Crea el item de venta vinculado al lote específico
                    await tx.sale_items.create({
                        data: {
                            sale_id: sale.id,
                            batch_id: batch.id,
                            quantity: deductFromBatch,
                            price_at_sale: priceAtSale,
                        },
                    });

                    // Suma al total de la venta
                    totalAmount += priceAtSale * deductFromBatch;

                    remainingQty -= deductFromBatch;
                }
            }

            // Actualiza el total de la venta
            const updatedSale = await tx.sales.update({
                where: { id: sale.id },
                data: { total_amount: totalAmount },
                include: {
                    sale_items: {
                        include: {
                            batches: true, // Incluye info del lote en cada item
                        },
                    },
                    users: {
                        select: { id: true, name: true, email: true },
                    },
                },
            });

            return updatedSale;
        });
    }
}

export default new SaleService();
