import { IDashboardSummary } from '../types/dashboard.types';
declare class DashboardService {
    getSummary(): Promise<IDashboardSummary>;
    getChartData(): Promise<{
        dailySales: {
            day: string;
            total: number;
        }[];
        salesByCategory: {
            name: string;
            value: number;
        }[];
        salesByPaymentMethod: {
            name: string;
            value: number;
        }[];
    }>;
}
declare const _default: DashboardService;
export default _default;
//# sourceMappingURL=DashboardService.d.ts.map