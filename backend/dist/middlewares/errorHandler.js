"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
// Middleware global para manejar errores en la aplicación
const errorHandler = (err, req, res, _next) => {
    // Si el status ya fue establecido en la ruta, lo usa; si no, usa 500 (error interno del servidor)
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    // Registrar el error detallado con Winston
    logger_1.default.error(err.message, {
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        ip: req.ip,
        user: req.user?.id || 'Unauthenticated'
    });
    res.status(statusCode);
    // Devuelve el mensaje de error y el stack trace (solo en desarrollo, no en producción)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map