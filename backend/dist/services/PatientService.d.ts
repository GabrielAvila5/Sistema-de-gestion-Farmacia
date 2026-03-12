import { CreatePatientInput, UpdatePatientInput } from '../validators/patient.validator';
declare class PatientService {
    private generatePatientCode;
    createPatient(data: CreatePatientInput): Promise<{
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
    }>;
    getAllPatients(): Promise<{
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
    }[]>;
    searchPatients(query: string): Promise<{
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
    }[]>;
    getPatientById(id: number): Promise<{
        consultations: ({
            users: {
                name: string;
                medical_license: string | null;
            };
        } & {
            id: number;
            notes: string | null;
            consultation_date: Date;
            patient_id: number;
            doctor_id: number;
            diagnosis: string;
            treatment: string;
            temperature: import("@prisma/client/runtime/library").Decimal | null;
            weight: import("@prisma/client/runtime/library").Decimal | null;
            height: import("@prisma/client/runtime/library").Decimal | null;
            bmi: import("@prisma/client/runtime/library").Decimal | null;
            abdominal_circ: import("@prisma/client/runtime/library").Decimal | null;
            end_treatment_date: Date | null;
            doctor_name_snapshot: string | null;
            doctor_license: string | null;
        })[];
        appointments: {
            id: number;
            created_at: Date | null;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            appointment_date: Date;
            patient_id: number;
            doctor_id: number;
            reason: string | null;
            source: string;
        }[];
    } & {
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
    }>;
    updatePatient(id: number, data: UpdatePatientInput): Promise<{
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
    }>;
    deletePatient(id: number): Promise<{
        message: string;
    }>;
}
declare const _default: PatientService;
export default _default;
//# sourceMappingURL=PatientService.d.ts.map