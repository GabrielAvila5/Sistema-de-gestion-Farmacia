import { CreateAppointmentInput, UpdateAppointmentInput } from '../validators/appointment.validator';
declare class AppointmentService {
    createAppointment(data: CreateAppointmentInput, defaultDoctorId?: number): Promise<{
        users: {
            name: string;
            id: number;
            email: string;
        };
        patients: {
            id: number;
            created_at: Date | null;
            email: string | null;
            first_name: string;
            last_name: string;
            date_of_birth: Date;
            phone: string | null;
            gender: string | null;
            address: string | null;
            has_allergies: boolean;
            allergies_detail: string | null;
            medical_history: string | null;
            is_incomplete: boolean;
            patient_code: string;
        };
    } & {
        id: number;
        created_at: Date | null;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        appointment_date: Date;
        patient_id: number;
        doctor_id: number;
        reason: string | null;
        source: string;
    }>;
    getAllAppointments(): Promise<({
        users: {
            name: string;
        };
        patients: {
            first_name: string;
            last_name: string;
        };
    } & {
        id: number;
        created_at: Date | null;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        appointment_date: Date;
        patient_id: number;
        doctor_id: number;
        reason: string | null;
        source: string;
    })[]>;
    getAppointmentById(id: number): Promise<{
        users: {
            name: string;
            id: number;
            roles: {
                name: string;
                id: number;
            } | null;
            email: string;
        };
        patients: {
            id: number;
            created_at: Date | null;
            email: string | null;
            first_name: string;
            last_name: string;
            date_of_birth: Date;
            phone: string | null;
            gender: string | null;
            address: string | null;
            has_allergies: boolean;
            allergies_detail: string | null;
            medical_history: string | null;
            is_incomplete: boolean;
            patient_code: string;
        };
    } & {
        id: number;
        created_at: Date | null;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        appointment_date: Date;
        patient_id: number;
        doctor_id: number;
        reason: string | null;
        source: string;
    }>;
    updateAppointment(id: number, data: UpdateAppointmentInput): Promise<{
        id: number;
        created_at: Date | null;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        appointment_date: Date;
        patient_id: number;
        doctor_id: number;
        reason: string | null;
        source: string;
    }>;
    deleteAppointment(id: number): Promise<{
        message: string;
    }>;
}
declare const _default: AppointmentService;
export default _default;
//# sourceMappingURL=AppointmentService.d.ts.map