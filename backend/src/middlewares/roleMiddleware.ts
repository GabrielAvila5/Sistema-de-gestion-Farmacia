import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para restringir rutas basado en roles.
 * @param allowedRoles Array de roles permitidos (ej. ['admin', 'doctor'])
 */
export const checkRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Obtenemos el usuario inyectado por el authMiddleware
        const user = req.user;

        if (!user || !user.role) {
            res.status(403);
            return next(new Error('Acceso denegado, no se encontró el rol del usuario'));
        }

        // Verificamos si el rol del usuario está en la lista de permitidos
        if (!allowedRoles.includes(user.role)) {
            res.status(403);
            return next(new Error('Acceso denegado, no tienes los permisos necesarios'));
        }

        next();
    };
};
