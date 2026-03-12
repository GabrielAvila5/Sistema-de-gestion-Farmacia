/**
 * @fileoverview Controlador para manejar las peticiones HTTP (req, res) relacionadas con sale.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { Request, Response, NextFunction } from 'express';
declare const createSale: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getSales: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getSaleById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const voidSale: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { createSale, getSales, getSaleById, voidSale };
//# sourceMappingURL=saleController.d.ts.map