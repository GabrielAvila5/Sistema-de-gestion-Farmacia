/**
 * @fileoverview Controlador para manejar las peticiones HTTP (req, res) relacionadas con dashboard.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { Request, Response, NextFunction } from 'express';
import dashboardService from '../services/DashboardService';

export const getDashboardSummary = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const summary = await dashboardService.getSummary();
        res.json(summary);
    } catch (error) {
        next(error);
    }
};

export const getDashboardCharts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const chartData = await dashboardService.getChartData();
        res.json(chartData);
    } catch (error) {
        next(error);
    }
};
