import { CreateSupplierInput, UpdateSupplierInput } from '../validators/supplier.validator';
declare class SupplierService {
    getAllSuppliers(): Promise<({
        _count: {
            purchase_orders: number;
        };
    } & {
        name: string;
        id: number;
        email: string | null;
        is_active: boolean;
        phone: string | null;
        contact_name: string | null;
        lead_time_days: number | null;
    })[]>;
    getSupplierById(id: number): Promise<{
        name: string;
        id: number;
        email: string | null;
        is_active: boolean;
        phone: string | null;
        contact_name: string | null;
        lead_time_days: number | null;
    }>;
    createSupplier(data: CreateSupplierInput): Promise<{
        name: string;
        id: number;
        email: string | null;
        is_active: boolean;
        phone: string | null;
        contact_name: string | null;
        lead_time_days: number | null;
    }>;
    updateSupplier(id: number, data: UpdateSupplierInput): Promise<{
        name: string;
        id: number;
        email: string | null;
        is_active: boolean;
        phone: string | null;
        contact_name: string | null;
        lead_time_days: number | null;
    }>;
    updateSupplierStatus(id: number, is_active: boolean): Promise<{
        name: string;
        id: number;
        email: string | null;
        is_active: boolean;
        phone: string | null;
        contact_name: string | null;
        lead_time_days: number | null;
    }>;
    deleteSupplier(id: number): Promise<{
        name: string;
        id: number;
        email: string | null;
        is_active: boolean;
        phone: string | null;
        contact_name: string | null;
        lead_time_days: number | null;
    }>;
}
declare const _default: SupplierService;
export default _default;
//# sourceMappingURL=SupplierService.d.ts.map