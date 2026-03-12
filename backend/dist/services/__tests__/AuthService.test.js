"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Pruebas unitarias para AuthService.
 * Valida la autenticación, bloqueo de usuarios inactivos y la firma de JWT.
 */
const vitest_1 = require("vitest");
const AuthService_1 = __importDefault(require("../AuthService"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Mocks
vitest_1.vi.mock('../../config/prisma', () => ({
    default: {
        users: {
            findUnique: vitest_1.vi.fn(),
        }
    }
}));
vitest_1.vi.mock('bcryptjs', () => ({
    default: {
        compare: vitest_1.vi.fn(),
    }
}));
vitest_1.vi.mock('jsonwebtoken', () => ({
    default: {
        sign: vitest_1.vi.fn(),
    }
}));
(0, vitest_1.describe)('AuthService - login()', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        process.env.JWT_SECRET = 'test-secret';
    });
    (0, vitest_1.it)('Debería retornar un token y datos del usuario si las credenciales son válidas', async () => {
        const mockUser = {
            id: 1,
            name: 'Juan',
            email: 'juan@test.com',
            password: 'hashedpassword',
            is_active: true,
            roles: { name: 'admin' }
        };
        // Simular que el usuario existe en BD
        prisma_1.default.users.findUnique.mockResolvedValue(mockUser);
        // Simular que la contraseña es correcta
        bcryptjs_1.default.compare.mockResolvedValue(true);
        // Simular la firma del JWT
        jsonwebtoken_1.default.sign.mockReturnValue('fake-jwt-token');
        const result = await AuthService_1.default.login('juan@test.com', 'password123');
        (0, vitest_1.expect)(prisma_1.default.users.findUnique).toHaveBeenCalledWith({
            where: { email: 'juan@test.com' },
            include: { roles: true }
        });
        (0, vitest_1.expect)(bcryptjs_1.default.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
        (0, vitest_1.expect)(jsonwebtoken_1.default.sign).toHaveBeenCalled();
        (0, vitest_1.expect)(result).toEqual({
            token: 'fake-jwt-token',
            user: { id: 1, name: 'Juan', email: 'juan@test.com', role: 'admin' }
        });
    });
    (0, vitest_1.it)('Debería arrojar error si el usuario no existe', async () => {
        prisma_1.default.users.findUnique.mockResolvedValue(null);
        await (0, vitest_1.expect)(AuthService_1.default.login('notfound@test.com', 'pass')).rejects.toThrow('Credenciales inválidas');
    });
    (0, vitest_1.it)('Debería arrojar error si la contraseña es incorrecta', async () => {
        const mockUser = { id: 1, password: 'hash', is_active: true };
        prisma_1.default.users.findUnique.mockResolvedValue(mockUser);
        bcryptjs_1.default.compare.mockResolvedValue(false);
        await (0, vitest_1.expect)(AuthService_1.default.login('juan@test.com', 'wrongpass')).rejects.toThrow('Credenciales inválidas');
    });
    (0, vitest_1.it)('Debería arrojar error si el usuario está inactivo (is_active = false)', async () => {
        const mockUser = { id: 1, password: 'hash', is_active: false };
        prisma_1.default.users.findUnique.mockResolvedValue(mockUser);
        bcryptjs_1.default.compare.mockResolvedValue(true);
        await (0, vitest_1.expect)(AuthService_1.default.login('juan@test.com', 'password123')).rejects.toThrow('Tu cuenta ha sido desactivada. Contacta al administrador.');
    });
});
//# sourceMappingURL=AuthService.test.js.map