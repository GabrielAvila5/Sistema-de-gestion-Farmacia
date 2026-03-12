/**
 * @fileoverview Controlador para manejar las peticiones HTTP (req, res) relacionadas con appointment.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { Request, Response, NextFunction } from 'express';
export declare const createAppointment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAppointments: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAppointmentById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateAppointment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteAppointment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=appointmentController.d.ts.map