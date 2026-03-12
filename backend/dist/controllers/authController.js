"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../services/AuthService"));
const authValidator_1 = require("../validators/authValidator");
class AuthController {
    /**
     * Maneja el endpoint de login
     */
    async login(req, res, next) {
        try {
            // Validar la request con Zod
            const validatedData = authValidator_1.loginSchema.parse(req.body);
            // Llamar al servicio
            const result = await AuthService_1.default.login(validatedData.email, validatedData.password);
            // Devolver respuesta
            res.status(200).json({
                message: 'Login exitoso',
                ...result
            });
        }
        catch (error) {
            // Si es un error personalizado de "Credenciales inválidas", lo marcamos como 401
            if (error.message === 'Credenciales inválidas') {
                res.status(401);
            }
            next(error);
        }
    }
}
exports.default = new AuthController();
//# sourceMappingURL=authController.js.map