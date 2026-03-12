import { Request, Response, NextFunction } from 'express';
import consultationService from '../services/ConsultationService';

export const createConsultation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const consultation = await consultationService.createConsultation(req.body);
        res.status(201).json(consultation);
    } catch (error) {
        next(error);
    }
};

export const getConsultationsByPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const patientId = parseInt(String(req.params.patientId), 10);
        if (isNaN(patientId)) {
            res.status(400);
            throw new Error('ID de paciente inválido');
        }
        const consultations = await consultationService.getConsultationsByPatient(patientId);
        res.json(consultations);
    } catch (error) {
        next(error);
    }
};

export const getConsultationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400);
            throw new Error('ID de consulta inválido');
        }
        const consultation = await consultationService.getConsultationById(id);
        res.json(consultation);
    } catch (error) {
        if (error instanceof Error && error.message === 'Consulta no encontrada') res.status(404);
        next(error);
    }
};
