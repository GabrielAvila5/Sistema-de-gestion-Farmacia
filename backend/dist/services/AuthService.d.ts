declare class AuthService {
    /**
     * Authenticates a user and generates a JWT
     * @param email User email
     * @param password User password
     * @returns JWT token and user info, or throws an error
     */
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: string | undefined;
        };
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=AuthService.d.ts.map