import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
    /**
     * Authenticates a user and generates a JWT
     * @param email User email
     * @param password User password
     * @returns JWT token and user info, or throws an error
     */
    async login(email: string, password: string) {
        // Encontrar el usuario por email e incluir el rol
        const user = await prisma.users.findUnique({
            where: { email },
            include: { roles: true }
        });

        if (!user) {
            throw new Error('Credenciales inválidas'); // User not found
        }

        // Comparar contraseñas
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas'); // Password incorrect
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET no configurado en el servidor');
        }

        const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

        // Generar JWT
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                role: user.roles?.name // name of the role (admin, doctor, employee)
            },
            jwtSecret,
            { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] }
        );

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

export default new AuthService();
