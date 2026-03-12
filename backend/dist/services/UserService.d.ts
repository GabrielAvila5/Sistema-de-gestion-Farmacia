import type { CreateUserInput } from '../validators/user.validator';
declare class UserService {
    /**
     * Lista todos los usuarios con su rol
     */
    getAllUsers(): Promise<{
        name: string;
        id: number;
        roles: {
            name: string;
            id: number;
        } | null;
        email: string;
        role_id: number | null;
        is_active: boolean;
    }[]>;
    /**
     * Crea un nuevo usuario con contraseña hasheada
     */
    createUser(data: CreateUserInput): Promise<{
        name: string;
        id: number;
        roles: {
            name: string;
            id: number;
        } | null;
        email: string;
        is_active: boolean;
    }>;
    /**
     * Activa/desactiva un usuario. Protección anti-autodesactivación.
     */
    toggleActive(targetUserId: number, requestingUserId: number): Promise<{
        name: string;
        id: number;
        roles: {
            name: string;
            id: number;
        } | null;
        email: string;
        is_active: boolean;
    }>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=UserService.d.ts.map