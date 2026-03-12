"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsultationSchema = void 0;
const zod_1 = require("zod");
exports.createConsultationSchema = zod_1.z.object({
    patient_id: zod_1.z.number().int().positive(),
    doctor_id: zod_1.z.number().int().positive(),
    temperature: zod_1.z.number().positive().optional(),
    weight: zod_1.z.number().positive().optional(),
    height: zod_1.z.number().positive().optional(),
    bmi: zod_1.z.number().positive().optional(),
    abdominal_circ: zod_1.z.number().positive().optional(),
    diagnosis: zod_1.z.string().min(3, "El diagnóstico es requerido"),
    treatment: zod_1.z.string().min(3, "El tratamiento es requerido"),
    notes: zod_1.z.string().optional(),
    end_treatment_date: zod_1.z.string().datetime().optional()
});
//# sourceMappingURL=consultation.validator.js.map