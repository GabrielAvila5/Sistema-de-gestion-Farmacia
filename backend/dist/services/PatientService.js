"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Servicio que encapsula la lógica de negocio y consultas a la base de datos para la entidad de Patient.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const prisma_1 = __importDefault(require("../config/prisma"));
class PatientService {
    async generatePatientCode(data) {
        const firstNameCode = data.first_name.substring(0, 2).toUpperCase();
        const currentYear = new Date().getFullYear();
        const dob = new Date(data.date_of_birth);
        const dobString = `${dob.getUTCFullYear()}${String(dob.getUTCMonth() + 1).padStart(2, '0')}${String(dob.getUTCDate()).padStart(2, '0')}`;
        let phoneCode = '0000';
        if (data.phone && data.phone.length >= 4) {
            phoneCode = data.phone.slice(-4);
        }
        else if (data.phone) {
            phoneCode = data.phone.padStart(4, '0');
        }
        const baseCode = `${firstNameCode}-${currentYear}-${dobString}-${phoneCode}`;
        let code = baseCode;
        let counter = 1;
        while (true) {
            const existing = await prisma_1.default.patients.findUnique({ where: { patient_code: code } });
            if (!existing)
                break;
            code = `${baseCode}-${counter}`;
            counter++;
        }
        return code;
    }
    async createPatient(data) {
        const patient_code = await this.generatePatientCode(data);
        return prisma_1.default.patients.create({
            data: {
                patient_code,
                first_name: data.first_name,
                last_name: data.last_name,
                date_of_birth: new Date(data.date_of_birth),
                phone: data.phone,
                email: data.email || null,
                gender: data.gender,
                address: data.address,
                has_allergies: data.has_allergies ?? false,
                allergies_detail: data.allergies_detail,
                medical_history: data.medical_history,
            },
        });
    }
    async getAllPatients() {
        return prisma_1.default.patients.findMany({
            orderBy: { last_name: 'asc' },
        });
    }
    async searchPatients(query) {
        if (!query || query.length < 2)
            return [];
        return prisma_1.default.patients.findMany({
            where: {
                OR: [
                    { first_name: { contains: query } },
                    { last_name: { contains: query } },
                    { phone: { contains: query } },
                    { email: { contains: query } },
                    { patient_code: { contains: query } }
                ]
            },
            take: 10,
            orderBy: { last_name: 'asc' }
        });
    }
    async getPatientById(id) {
        const patient = await prisma_1.default.patients.findUnique({
            where: { id },
            include: {
                appointments: {
                    orderBy: { appointment_date: 'desc' },
                },
                consultations: {
                    orderBy: { consultation_date: 'desc' },
                    include: {
                        users: {
                            select: { name: true, medical_license: true }
                        }
                    }
                }
            },
        });
        if (!patient)
            throw new Error('Paciente no encontrado');
        return patient;
    }
    async updatePatient(id, data) {
        const existing = await prisma_1.default.patients.findUnique({ where: { id } });
        if (!existing)
            throw new Error('Paciente no encontrado');
        return prisma_1.default.patients.update({
            where: { id },
            data: {
                ...(data.first_name && { first_name: data.first_name }),
                ...(data.last_name && { last_name: data.last_name }),
                ...(data.date_of_birth && { date_of_birth: new Date(data.date_of_birth) }),
                ...(data.phone !== undefined && { phone: data.phone }),
                ...(data.email !== undefined && { email: data.email || null }),
                ...(data.gender !== undefined && { gender: data.gender }),
                ...(data.address !== undefined && { address: data.address }),
                ...(data.has_allergies !== undefined && { has_allergies: data.has_allergies }),
                ...(data.allergies_detail !== undefined && { allergies_detail: data.allergies_detail }),
                ...(data.medical_history !== undefined && { medical_history: data.medical_history }),
            },
        });
    }
    async deletePatient(id) {
        const existing = await prisma_1.default.patients.findUnique({ where: { id } });
        if (!existing)
            throw new Error('Paciente no encontrado');
        await prisma_1.default.patients.delete({ where: { id } });
        return { message: 'Paciente eliminado exitosamente' };
    }
}
exports.default = new PatientService();
//# sourceMappingURL=PatientService.js.map