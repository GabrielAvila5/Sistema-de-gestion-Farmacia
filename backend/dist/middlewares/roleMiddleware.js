"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
/**
 * Middleware para restringir rutas basado en roles.
 * @param allowedRoles Array de roles permitidos (ej. ['admin', 'doctor'])
 */
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // Obtenemos el usuario inyectado por el authMiddleware
        const user = req.user;
        if (!user || !user.role) {
            res.status(403);
            return next(new Error('Acceso denegado, no se encontró el rol del usuario'));
        }
        // Verificamos si el rol del usuario está en la lista de permitidos
        if (!allowedRoles.includes(user.role)) {
            // Generar log de auditoría
            console.warn(`[SECURITY_ALERT] Usuario: ${user.id} | Rol: ${user.role} | Intentó acceder a: ${req.originalUrl || req.path} sin permisos.`);
            res.status(403);
            return next(new Error('Acceso denegado, no tienes los permisos necesarios'));
        }
        next();
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=roleMiddleware.js.map