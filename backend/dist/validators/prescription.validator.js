"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrescriptionSchema = void 0;
const zod_1 = require("zod");
exports.generatePrescriptionSchema = zod_1.z.object({
    doctorName: zod_1.z.string().min(2),
    doctorLicense: zod_1.z.string().nullable().optional().or(zod_1.z.literal('')),
    patientName: zod_1.z.string().min(2),
    patientCode: zod_1.z.string().nullable().optional().or(zod_1.z.literal('')),
    patientAge: zod_1.z.number().int().positive().nullable().optional(),
    patientAllergies: zod_1.z.string().nullable().optional().or(zod_1.z.literal('')),
    diagnosis: zod_1.z.string().min(2),
    treatment: zod_1.z.string().min(2),
    consultationId: zod_1.z.number().int().positive().optional(),
});
//# sourceMappingURL=prescription.validator.js.map