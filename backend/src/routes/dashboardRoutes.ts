/**
 * @fileoverview Define los endpoints (rutas) de la API para dashboard y enlaza sus respectivos controladores.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';
import { getDashboardSummary, getDashboardCharts } from '../controllers/dashboardController';

const router = express.Router();

// Middleware globales del router
router.use(authenticate);
// La vista de Dashboard principal está reservada al equipo clínico y administrativo
router.use(checkRole(['admin', 'doctor']));

// Endpoint principal
router.get('/summary', getDashboardSummary);

// Datos para gráficas (ventas 7 días + categorías)
router.get('/charts', getDashboardCharts);

export default router;
