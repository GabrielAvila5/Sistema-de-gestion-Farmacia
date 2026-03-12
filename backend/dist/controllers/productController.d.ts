/**
 * @fileoverview Controlador para manejar las peticiones HTTP (req, res) relacionadas con product.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { Request, Response, NextFunction } from 'express';
declare const createProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProducts: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProductById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const searchProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { createProduct, getProducts, getProductById, updateProduct, deleteProduct, searchProducts, };
//# sourceMappingURL=productController.d.ts.map