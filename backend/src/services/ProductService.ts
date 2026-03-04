import prisma from '../config/prisma';
import { nanoid } from 'nanoid';
import { CreateProductInput, UpdateProductInput } from '../validators/product.validator';

// Servicio que encapsula la lógica de negocio de productos
class ProductService {
    /**
     * Genera un SKU único de 8 caracteres usando nanoid.
     * Prefijo "PRD-" + 8 caracteres alfanuméricos.
     */
    private generateSku(): string {
        return `PRD-${nanoid(8)}`;
    }

    /**
     * Crea un nuevo producto con SKU generado automáticamente.
     * Si se envían lotes (batches), se crean anidados junto al producto.
     */
    async createProduct(data: CreateProductInput) {
        const sku = this.generateSku();

        // Verifica si el SKU generado ya existe (improbable, pero seguro)
        const existing = await prisma.products.findUnique({ where: { sku } });
        if (existing) {
            throw new Error('SKU generado ya existe, intenta de nuevo');
        }

        // Crear el producto con lotes anidados si se proporcionan
        const product = await prisma.products.create({
            data: {
                sku,
                name: data.name,
                description: data.description ?? null,
                base_price: data.base_price,
                category: data.category ?? null,
                // Si se envían lotes, se crean anidados con create
                ...(data.batches && data.batches.length > 0 && {
                    batches: {
                        create: data.batches.map((batch) => ({
                            batch_number: batch.batch_number,
                            quantity: batch.quantity,
                            expiry_date: new Date(batch.expiry_date),
                            promo_price: batch.promo_price ?? null,
                            location: batch.location ?? null,
                        })),
                    },
                }),
            },
            include: {
                batches: true, // Incluye los lotes creados en la respuesta
            },
        });

        return product;
    }

    /**
     * Obtiene todos los productos con sus lotes.
     */
    async getAllProducts() {
        return prisma.products.findMany({
            include: {
                batches: {
                    orderBy: { expiry_date: 'asc' },
                },
            },
        });
    }

    /**
     * Obtiene un producto por su ID.
     */
    async getProductById(id: number) {
        const product = await prisma.products.findUnique({
            where: { id },
            include: {
                batches: {
                    orderBy: { expiry_date: 'asc' },
                },
            },
        });

        if (!product) {
            throw new Error('Producto no encontrado');
        }

        return product;
    }

    /**
     * Actualiza un producto por su ID.
     */
    async updateProduct(id: number, data: UpdateProductInput) {
        // Verifica que el producto existe
        const existing = await prisma.products.findUnique({ where: { id } });
        if (!existing) {
            throw new Error('Producto no encontrado');
        }

        return prisma.products.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.base_price !== undefined && { base_price: data.base_price }),
                ...(data.category !== undefined && { category: data.category }),
            },
            include: {
                batches: true,
            },
        });
    }

    /**
     * Elimina un producto por su ID.
     */
    async deleteProduct(id: number) {
        const existing = await prisma.products.findUnique({ where: { id } });
        if (!existing) {
            throw new Error('Producto no encontrado');
        }

        // Primero elimina los lotes asociados, luego el producto
        await prisma.batches.deleteMany({ where: { product_id: id } });
        await prisma.products.delete({ where: { id } });

        return { message: 'Producto eliminado' };
    }
}

export default new ProductService();
