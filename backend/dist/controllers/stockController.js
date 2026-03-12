"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StockService_1 = __importDefault(require("../services/StockService"));
class StockController {
    /**
     * POST /api/stock/quick-restock
     * Realiza un ingreso rápido de mercancía sin orden de compra.
     */
    async quickRestock(req, res) {
        try {
            // El usuario autenticado viene del authMiddleware
            const user_id = req.user?.id;
            if (!user_id) {
                return res.status(401).json({ message: 'Usuario no autenticado' });
            }
            const data = {
                ...req.body,
                expiry_date: new Date(req.body.expiry_date),
                user_id
            };
            const result = await StockService_1.default.quickRestock(data);
            return res.status(201).json({
                message: 'Ajuste de inventario registrado correctamente',
                data: result
            });
        }
        catch (error) {
            console.error('Error en quickRestock:', error);
            return res.status(400).json({ message: error.message || 'Error al registrar reabastecimiento rápido' });
        }
    }
    /**
     * GET /api/stock/movements
     * Retorna el historial de movimientos de inventario.
     */
    async getInventoryMovements(req, res) {
        try {
            const movements = await StockService_1.default.getInventoryMovements();
            return res.status(200).json(movements);
        }
        catch (error) {
            console.error('Error al obtener movimientos de inventario:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}
exports.default = new StockController();
//# sourceMappingURL=stockController.js.map