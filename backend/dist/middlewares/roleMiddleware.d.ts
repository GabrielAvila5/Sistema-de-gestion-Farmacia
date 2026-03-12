/**
 * @fileoverview Middleware para autorizar el acceso a rutas basado en los roles del usuario.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import { Request, Response, NextFunction } from 'express';
/**
 * Middleware para restringir rutas basado en roles.
 * @param allowedRoles Array de roles permitidos (ej. ['admin', 'doctor'])
 */
export declare const checkRole: (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=roleMiddleware.d.ts.map