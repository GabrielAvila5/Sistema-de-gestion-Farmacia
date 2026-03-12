"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Define los endpoints (rutas) de la API para dashboard y enlaza sus respectivos controladores.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const dashboardController_1 = require("../controllers/dashboardController");
const router = express_1.default.Router();
// Middleware globales del router
router.use(authMiddleware_1.authenticate);
// La vista de Dashboard principal está reservada al equipo clínico y administrativo
router.use((0, roleMiddleware_1.checkRole)(['admin', 'doctor']));
// Endpoint principal
router.get('/summary', dashboardController_1.getDashboardSummary);
// Datos para gráficas (ventas 7 días + categorías)
router.get('/charts', dashboardController_1.getDashboardCharts);
exports.default = router;
//# sourceMappingURL=dashboardRoutes.js.map