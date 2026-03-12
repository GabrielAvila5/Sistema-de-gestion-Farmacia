"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Servicio que encapsula la lógica de negocio y consultas a la base de datos para la entidad de User.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    /**
     * Lista todos los usuarios con su rol
     */
    async getAllUsers() {
        return prisma_1.default.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                is_active: true,
                role_id: true,
                roles: { select: { id: true, name: true } },
            },
            orderBy: { name: 'asc' },
        });
    }
    /**
     * Crea un nuevo usuario con contraseña hasheada
     */
    async createUser(data) {
        // Buscar el role_id por nombre
        const role = await prisma_1.default.roles.findUnique({
            where: { name: data.role },
        });
        if (!role) {
            throw new Error(`Rol "${data.role}" no encontrado en la base de datos.`);
        }
        // Verificar email duplicado
        const existing = await prisma_1.default.users.findUnique({
            where: { email: data.email },
        });
        if (existing) {
            throw new Error('Ya existe un usuario con ese email.');
        }
        // Hash del password
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await prisma_1.default.users.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role_id: role.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                is_active: true,
                roles: { select: { id: true, name: true } },
            },
        });
        return user;
    }
    /**
     * Activa/desactiva un usuario. Protección anti-autodesactivación.
     */
    async toggleActive(targetUserId, requestingUserId) {
        // Protección: no puedes desactivarte a ti mismo
        if (targetUserId === requestingUserId) {
            throw new Error('No puedes desactivar tu propia cuenta.');
        }
        const user = await prisma_1.default.users.findUnique({
            where: { id: targetUserId },
        });
        if (!user) {
            throw new Error('Usuario no encontrado.');
        }
        const updated = await prisma_1.default.users.update({
            where: { id: targetUserId },
            data: { is_active: !user.is_active },
            select: {
                id: true,
                name: true,
                email: true,
                is_active: true,
                roles: { select: { id: true, name: true } },
            },
        });
        return updated;
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map