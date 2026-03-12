/**
 * @fileoverview Controlador para manejar las peticiones HTTP (req, res) relacionadas con patient.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { Request, Response, NextFunction } from 'express';
export declare const createPatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPatients: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const searchPatients: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPatientById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updatePatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deletePatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=patientController.d.ts.map