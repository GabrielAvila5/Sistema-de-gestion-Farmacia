"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardCharts = exports.getDashboardSummary = void 0;
const DashboardService_1 = __importDefault(require("../services/DashboardService"));
const getDashboardSummary = async (_req, res, next) => {
    try {
        const summary = await DashboardService_1.default.getSummary();
        res.json(summary);
    }
    catch (error) {
        next(error);
    }
};
exports.getDashboardSummary = getDashboardSummary;
const getDashboardCharts = async (_req, res, next) => {
    try {
        const chartData = await DashboardService_1.default.getChartData();
        res.json(chartData);
    }
    catch (error) {
        next(error);
    }
};
exports.getDashboardCharts = getDashboardCharts;
//# sourceMappingURL=dashboardController.js.map