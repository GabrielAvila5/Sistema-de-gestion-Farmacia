"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConsultationById = exports.getConsultationsByPatient = exports.createConsultation = void 0;
const ConsultationService_1 = __importDefault(require("../services/ConsultationService"));
const createConsultation = async (req, res, next) => {
    try {
        const consultation = await ConsultationService_1.default.createConsultation(req.body);
        res.status(201).json(consultation);
    }
    catch (error) {
        next(error);
    }
};
exports.createConsultation = createConsultation;
const getConsultationsByPatient = async (req, res, next) => {
    try {
        const patientId = parseInt(String(req.params.patientId), 10);
        if (isNaN(patientId)) {
            res.status(400);
            throw new Error('ID de paciente inválido');
        }
        const consultations = await ConsultationService_1.default.getConsultationsByPatient(patientId);
        res.json(consultations);
    }
    catch (error) {
        next(error);
    }
};
exports.getConsultationsByPatient = getConsultationsByPatient;
const getConsultationById = async (req, res, next) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de consulta inválido');
        }
        const consultation = await ConsultationService_1.default.getConsultationById(id);
        res.json(consultation);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Consulta no encontrada')
            res.status(404);
        next(error);
    }
};
exports.getConsultationById = getConsultationById;
//# sourceMappingURL=consultationController.js.map