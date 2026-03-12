/**
 * @fileoverview Servicio que encapsula la lógica de negocio y consultas a la base de datos para la entidad de User.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import type { CreateUserInput } from '../validators/user.validator';

class UserService {
    /**
     * Lista todos los usuarios con su rol
     */
    async getAllUsers() {
        return prisma.users.findMany({
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
    async createUser(data: CreateUserInput) {
        // Buscar el role_id por nombre
        const role = await prisma.roles.findUnique({
            where: { name: data.role },
        });

        if (!role) {
            throw new Error(`Rol "${data.role}" no encontrado en la base de datos.`);
        }

        // Verificar email duplicado
        const existing = await prisma.users.findUnique({
            where: { email: data.email },
        });

        if (existing) {
            throw new Error('Ya existe un usuario con ese email.');
        }

        // Hash del password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.users.create({
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
    async toggleActive(targetUserId: number, requestingUserId: number) {
        // Protección: no puedes desactivarte a ti mismo
        if (targetUserId === requestingUserId) {
            throw new Error('No puedes desactivar tu propia cuenta.');
        }

        const user = await prisma.users.findUnique({
            where: { id: targetUserId },
        });

        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        const updated = await prisma.users.update({
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

export default new UserService();
