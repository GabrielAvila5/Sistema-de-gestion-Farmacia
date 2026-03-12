"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
// Middleware genérico de validación con Zod
// Recibe un schema de Zod y valida el cuerpo de la petición
const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            // Si hay errores de validación, responde 400 con la lista formateada
            res.status(400).json({
                message: 'Error de validación',
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })),
            });
            return;
        }
        // Reemplaza req.body con datos parseados y validados
        req.body = result.data;
        next();
    };
};
exports.validateBody = validateBody;
//# sourceMappingURL=validateBody.js.map