"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Servicio que encapsula la lógica de negocio y consultas a la base de datos para la entidad de Product.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const prisma_1 = __importDefault(require("../config/prisma"));
const nanoid_1 = require("nanoid");
// Servicio que encapsula la lógica de negocio de productos
class ProductService {
    /**
     * Genera un SKU único de 8 caracteres usando nanoid.
     * Prefijo "PRD-" + 8 caracteres alfanuméricos.
     */
    generateSku() {
        return `PRD-${(0, nanoid_1.nanoid)(8)}`;
    }
    /**
     * Crea un nuevo producto con SKU generado automáticamente.
     * Si se envían lotes (batches), se crean anidados junto al producto.
     */
    async createProduct(data) {
        const sku = this.generateSku();
        // Verifica si el SKU generado ya existe (improbable, pero seguro)
        const existing = await prisma_1.default.products.findUnique({ where: { sku } });
        if (existing) {
            throw new Error('SKU generado ya existe, intenta de nuevo');
        }
        // Crear el producto con lotes anidados si se proporcionan
        const product = await prisma_1.default.products.create({
            data: {
                sku,
                name: data.name,
                description: data.description ?? null,
                base_price: data.base_price,
                category: data.category ?? null,
                brand: data.brand ?? null,
                supplier_id: data.supplier_id ?? null,
                min_stock: data.min_stock ?? 10,
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
        return prisma_1.default.products.findMany({
            include: {
                batches: {
                    orderBy: { expiry_date: 'asc' },
                },
                suppliers: true,
            },
        });
    }
    /**
     * Busca productos por nombre para sugerir medicamentos con stock en consultas.
     */
    async searchProducts(query) {
        if (!query || query.length < 2)
            return [];
        const products = await prisma_1.default.products.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { brand: { contains: query } }
                ]
            },
            include: {
                batches: {
                    where: {
                        expiry_date: { gt: new Date() },
                        quantity: { gt: 0 }
                    }
                }
            },
            take: 10
        });
        // Formatear para el frontend calculando el stock total de lotes vigentes
        return products.map(p => ({
            id: p.id,
            sku: p.sku,
            name: p.name,
            totalStock: p.batches.reduce((sum, b) => sum + b.quantity, 0)
        })).filter(p => p.totalStock > 0);
    }
    /**
     * Obtiene un producto por su ID.
     */
    async getProductById(id) {
        const product = await prisma_1.default.products.findUnique({
            where: { id },
            include: {
                batches: {
                    orderBy: { expiry_date: 'asc' },
                },
                suppliers: true,
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
    async updateProduct(id, data) {
        // Verifica que el producto existe
        const existing = await prisma_1.default.products.findUnique({ where: { id } });
        if (!existing) {
            throw new Error('Producto no encontrado');
        }
        return prisma_1.default.products.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.base_price !== undefined && { base_price: data.base_price }),
                ...(data.category !== undefined && { category: data.category }),
                ...(data.brand !== undefined && { brand: data.brand }),
                ...(data.supplier_id !== undefined && { supplier_id: data.supplier_id }),
                ...(data.min_stock !== undefined && { min_stock: data.min_stock }),
            },
            include: {
                batches: true,
            },
        });
    }
    /**
     * Elimina un producto por su ID.
     */
    async deleteProduct(id) {
        const existing = await prisma_1.default.products.findUnique({ where: { id } });
        if (!existing) {
            throw new Error('Producto no encontrado');
        }
        // Primero elimina los lotes asociados, luego el producto
        await prisma_1.default.batches.deleteMany({ where: { product_id: id } });
        await prisma_1.default.products.delete({ where: { id } });
        return { message: 'Producto eliminado' };
    }
}
exports.default = new ProductService();
//# sourceMappingURL=ProductService.js.map