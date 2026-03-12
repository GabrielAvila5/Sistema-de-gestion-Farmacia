"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware para proteger rutas, verificando el token JWT.
 */
const authenticate = (req, res, next) => {
    try {
        // Leer el header Authorization (Bearer <token>)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401);
            throw new Error('No autorizado, no hay token o formato incorrecto');
        }
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET no configurado');
        }
        // Verificar el token
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Adjuntar el usuario decodificado a req.user (gracias al module augmentation)
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401);
        next(new Error('No autorizado, token inválido o expirado'));
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authMiddleware.js.map