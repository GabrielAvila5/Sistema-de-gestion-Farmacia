"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Servicio que encapsula la lógica de negocio y consultas a la base de datos para la entidad de Auth.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    /**
     * Authenticates a user and generates a JWT
     * @param email User email
     * @param password User password
     * @returns JWT token and user info, or throws an error
     */
    async login(email, password) {
        // Encontrar el usuario por email e incluir el rol
        const user = await prisma_1.default.users.findUnique({
            where: { email },
            include: { roles: true }
        });
        if (!user) {
            throw new Error('Credenciales inválidas'); // User not found
        }
        // Comparar contraseñas
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas'); // Password incorrect
        }
        // Bloquear login de usuarios desactivados
        if (!user.is_active) {
            throw new Error('Tu cuenta ha sido desactivada. Contacta al administrador.');
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET no configurado en el servidor');
        }
        const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
        // Generar JWT
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            name: user.name,
            role: user.roles?.name // name of the role (admin, doctor, employee)
        }, jwtSecret, { expiresIn: expiresIn });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.roles?.name
            }
        };
    }
}
exports.default = new AuthService();
//# sourceMappingURL=AuthService.js.map