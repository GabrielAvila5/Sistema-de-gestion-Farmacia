"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.getAppointmentById = exports.getAppointments = exports.createAppointment = void 0;
const AppointmentService_1 = __importDefault(require("../services/AppointmentService"));
const createAppointment = async (req, res, next) => {
    try {
        // Tomamos el ID del doctor del usuario autenticado si es que la request la hace el mismo doctor
        const defaultDoctorId = req.user?.id;
        const appointment = await AppointmentService_1.default.createAppointment(req.body, defaultDoctorId);
        res.status(201).json(appointment);
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('horario exacto')) {
            res.status(409).json({ message: error.message });
            return;
        }
        next(error);
    }
};
exports.createAppointment = createAppointment;
const getAppointments = async (_req, res, next) => {
    try {
        const appointments = await AppointmentService_1.default.getAllAppointments();
        res.json(appointments);
    }
    catch (error) {
        next(error);
    }
};
exports.getAppointments = getAppointments;
const getAppointmentById = async (req, res, next) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de cita inválido');
        }
        const appointment = await AppointmentService_1.default.getAppointmentById(id);
        res.json(appointment);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Cita no encontrada')
            res.status(404);
        next(error);
    }
};
exports.getAppointmentById = getAppointmentById;
const updateAppointment = async (req, res, next) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de cita inválido');
        }
        const appointment = await AppointmentService_1.default.updateAppointment(id, req.body);
        res.json(appointment);
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('horario exacto')) {
            res.status(409).json({ message: error.message });
            return;
        }
        if (error instanceof Error && error.message === 'Cita no encontrada')
            res.status(404);
        next(error);
    }
};
exports.updateAppointment = updateAppointment;
const deleteAppointment = async (req, res, next) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de cita inválido');
        }
        const result = await AppointmentService_1.default.deleteAppointment(id);
        res.json(result);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Cita no encontrada')
            res.status(404);
        next(error);
    }
};
exports.deleteAppointment = deleteAppointment;
//# sourceMappingURL=appointmentController.js.map