import { Request, Response } from 'express';
declare class StockController {
    /**
     * POST /api/stock/quick-restock
     * Realiza un ingreso rápido de mercancía sin orden de compra.
     */
    quickRestock(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/stock/movements
     * Retorna el historial de movimientos de inventario.
     */
    getInventoryMovements(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: StockController;
export default _default;
//# sourceMappingURL=stockController.d.ts.map