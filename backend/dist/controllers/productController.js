"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const ProductService_1 = __importDefault(require("../services/ProductService"));
// @desc    Crea un nuevo producto (con SKU generado automáticamente)
// @route   POST /api/products
// @access  Privado/Admin
const createProduct = async (req, res, next) => {
    try {
        // req.body ya fue validado por el middleware Zod
        const product = await ProductService_1.default.createProduct(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
// @desc    Obtiene todos los productos con sus lotes
// @route   GET /api/products
// @access  Público
const getProducts = async (_req, res, next) => {
    try {
        const products = await ProductService_1.default.getAllProducts();
        res.json(products);
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
// @desc    Obtiene un producto por su ID
// @route   GET /api/products/:id
// @access  Público
const getProductById = async (req, res, next) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de producto inválido');
        }
        const product = await ProductService_1.default.getProductById(id);
        res.json(product);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Producto no encontrado') {
            res.status(404);
        }
        next(error);
    }
};
exports.getProductById = getProductById;
// @desc    Actualiza un producto por su ID
// @route   PUT /api/products/:id
// @access  Privado/Admin
const updateProduct = async (req, res, next) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de producto inválido');
        }
        const product = await ProductService_1.default.updateProduct(id, req.body);
        res.json(product);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Producto no encontrado') {
            res.status(404);
        }
        next(error);
    }
};
exports.updateProduct = updateProduct;
// @desc    Elimina un producto por su ID
// @route   DELETE /api/products/:id
// @access  Privado/Admin
const deleteProduct = async (req, res, next) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de producto inválido');
        }
        const result = await ProductService_1.default.deleteProduct(id);
        res.json(result);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Producto no encontrado') {
            res.status(404);
        }
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
// @desc    Busca productos (con stock vigente) por término
// @route   GET /api/products/search
// @access  Privado (Admin/Doctor/Employee)
const searchProducts = async (req, res, next) => {
    try {
        const q = req.query.q;
        const products = await ProductService_1.default.searchProducts(q || '');
        res.json(products);
    }
    catch (error) {
        next(error);
    }
};
exports.searchProducts = searchProducts;
//# sourceMappingURL=productController.js.map