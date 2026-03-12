"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = exports.updatePatient = exports.getPatientById = exports.searchPatients = exports.getPatients = exports.createPatient = void 0;
const PatientService_1 = __importDefault(require("../services/PatientService"));
const createPatient = async (req, res, next) => {
    try {
        const patient = await PatientService_1.default.createPatient(req.body);
        res.status(201).json(patient);
    }
    catch (error) {
        next(error);
    }
};
exports.createPatient = createPatient;
const getPatients = async (_req, res, next) => {
    try {
        const patients = await PatientService_1.default.getAllPatients();
        res.json(patients);
    }
    catch (error) {
        next(error);
    }
};
exports.getPatients = getPatients;
const searchPatients = async (req, res, next) => {
    try {
        const query = req.query.q;
        const patients = await PatientService_1.default.searchPatients(query || '');
        res.json(patients);
    }
    catch (error) {
        next(error);
    }
};
exports.searchPatients = searchPatients;
const getPatientById = async (req, res, next) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de paciente inválido');
        }
        const patient = await PatientService_1.default.getPatientById(id);
        res.json(patient);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Paciente no encontrado')
            res.status(404);
        next(error);
    }
};
exports.getPatientById = getPatientById;
const updatePatient = async (req, res, next) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de paciente inválido');
        }
        const patient = await PatientService_1.default.updatePatient(id, req.body);
        res.json(patient);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Paciente no encontrado')
            res.status(404);
        next(error);
    }
};
exports.updatePatient = updatePatient;
const deletePatient = async (req, res, next) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de paciente inválido');
        }
        const result = await PatientService_1.default.deletePatient(id);
        res.json(result);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Paciente no encontrado')
            res.status(404);
        next(error);
    }
};
exports.deletePatient = deletePatient;
//# sourceMappingURL=patientController.js.map