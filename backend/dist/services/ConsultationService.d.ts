import { CreateConsultationInput } from '../validators/consultation.validator';
declare class ConsultationService {
    createConsultation(data: CreateConsultationInput): Promise<{
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
    }>;
    getConsultationsByPatient(patientId: number): Promise<{
        temperature: number | null;
        weight: number | null;
        height: number | null;
        bmi: number | null;
        abdominal_circ: number | null;
        users: {
            name: string;
            medical_license: string | null;
        };
        id: number;
        notes: string | null;
        consultation_date: Date;
        patient_id: number;
        doctor_id: number;
        diagnosis: string;
        treatment: string;
        end_treatment_date: Date | null;
        doctor_name_snapshot: string | null;
        doctor_license: string | null;
    }[]>;
    getConsultationById(id: number): Promise<{
        temperature: number | null;
        weight: number | null;
        height: number | null;
        bmi: number | null;
        abdominal_circ: number | null;
        users: {
            name: string;
            medical_license: string | null;
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
        id: number;
        notes: string | null;
        consultation_date: Date;
        patient_id: number;
        doctor_id: number;
        diagnosis: string;
        treatment: string;
        end_treatment_date: Date | null;
        doctor_name_snapshot: string | null;
        doctor_license: string | null;
    }>;
}
declare const _default: ConsultationService;
export default _default;
//# sourceMappingURL=ConsultationService.d.ts.map