"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voidSale = exports.getSaleById = exports.getSales = exports.createSale = void 0;
const SaleService_1 = __importDefault(require("../services/SaleService"));
// @desc    Crea una nueva venta
// @route   POST /api/sales
// @access  Privado (Empleado/Admin/Doctor)
const createSale = async (req, res, next) => {
    try {
        // req.body ya fue validado por el middleware Zod
        const sale = await SaleService_1.default.createSale(req.body);
        res.status(201).json(sale);
    }
    catch (error) {
        // Si el error es de stock insuficiente o producto/usuario no encontrado, responde 400
        if (error instanceof Error) {
            if (error.message.includes('Stock insuficiente') ||
                error.message.includes('no encontrado')) {
                res.status(400);
            }
        }
        next(error);
    }
};
exports.createSale = createSale;
// @desc    Lista todas las ventas
// @route   GET /api/sales
// @access  Privado (Solo Admin)
const getSales = async (_req, res, next) => {
    try {
        const sales = await SaleService_1.default.getAllSales();
        res.json(sales);
    }
    catch (error) {
        next(error);
    }
};
exports.getSales = getSales;
// @desc    Obtiene detalle de una venta
// @route   GET /api/sales/:id
// @access  Privado (Solo Admin)
const getSaleById = async (req, res, next) => {
    try {
        const sale = await SaleService_1.default.getSaleById(Number(req.params.id));
        res.json(sale);
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('no encontrada')) {
            res.status(404);
        }
        next(error);
    }
};
exports.getSaleById = getSaleById;
// @desc    Anula una venta y revierte stock
// @route   POST /api/sales/:id/void
// @access  Privado (Solo Admin)
const voidSale = async (req, res, next) => {
    try {
        const sale = await SaleService_1.default.voidSale(Number(req.params.id));
        res.json({ message: 'Venta anulada exitosamente', sale });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('no encontrada')) {
                res.status(404);
            }
            else if (error.message.includes('ya fue anulada')) {
                res.status(400);
            }
        }
        next(error);
    }
};
exports.voidSale = voidSale;
//# sourceMappingURL=saleController.js.map