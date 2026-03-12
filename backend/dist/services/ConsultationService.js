"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
class ConsultationService {
    async createConsultation(data) {
        // Fetch doctor info for snapshots
        const doctor = await prisma_1.default.users.findUnique({
            where: { id: data.doctor_id }
        });
        if (!doctor)
            throw new Error('Doctor no encontrado');
        return prisma_1.default.consultations.create({
            data: {
                patient_id: data.patient_id,
                doctor_id: data.doctor_id,
                doctor_name_snapshot: doctor.name,
                doctor_license: doctor.medical_license,
                temperature: data.temperature,
                weight: data.weight,
                height: data.height,
                bmi: data.bmi,
                abdominal_circ: data.abdominal_circ,
                diagnosis: data.diagnosis,
                treatment: data.treatment,
                notes: data.notes,
                end_treatment_date: data.end_treatment_date ? new Date(data.end_treatment_date) : null
            }
        });
    }
    async getConsultationsByPatient(patientId) {
        const consultations = await prisma_1.default.consultations.findMany({
            where: { patient_id: patientId },
            orderBy: { consultation_date: 'desc' },
            include: {
                users: {
                    select: { name: true, medical_license: true }
                }
            }
        });
        // Format decimal values properly
        return consultations.map(c => ({
            ...c,
            temperature: c.temperature ? Number(c.temperature) : null,
            weight: c.weight ? Number(c.weight) : null,
            height: c.height ? Number(c.height) : null,
            bmi: c.bmi ? Number(c.bmi) : null,
            abdominal_circ: c.abdominal_circ ? Number(c.abdominal_circ) : null,
        }));
    }
    async getConsultationById(id) {
        const consultation = await prisma_1.default.consultations.findUnique({
            where: { id },
            include: {
                patients: true,
                users: {
                    select: { name: true, medical_license: true }
                }
            }
        });
        if (!consultation)
            throw new Error('Consulta no encontrada');
        return {
            ...consultation,
            temperature: consultation.temperature ? Number(consultation.temperature) : null,
            weight: consultation.weight ? Number(consultation.weight) : null,
            height: consultation.height ? Number(consultation.height) : null,
            bmi: consultation.bmi ? Number(consultation.bmi) : null,
            abdominal_circ: consultation.abdominal_circ ? Number(consultation.abdominal_circ) : null,
        };
    }
}
exports.default = new ConsultationService();
//# sourceMappingURL=ConsultationService.js.map