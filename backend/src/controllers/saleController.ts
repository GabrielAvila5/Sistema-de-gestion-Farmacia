import { Request, Response, NextFunction } from 'express';
import saleService from '../services/SaleService';

// @desc    Crea una nueva venta
// @route   POST /api/sales
// @access  Privado (Empleado/Admin/Doctor)
const createSale = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // req.body ya fue validado por el middleware Zod
        const sale = await saleService.createSale(req.body);
        res.status(201).json(sale);
    } catch (error) {
        // Si el error es de stock insuficiente o producto/usuario no encontrado, responde 400
        if (error instanceof Error) {
            if (
                error.message.includes('Stock insuficiente') ||
                error.message.includes('no encontrado')
            ) {
                res.status(400);
            }
        }
        next(error);
    }
};

export { createSale };
