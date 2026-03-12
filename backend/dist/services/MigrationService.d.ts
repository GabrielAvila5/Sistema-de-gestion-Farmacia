declare class MigrationService {
    /**
     * Importa datos desde un archivo JSON hacia la tabla correspondiente.
     * @param filePath - Ruta al archivo JSON con los datos.
     * @param type - Tipo de datos: 'products' o 'users'.
     */
    importData(filePath: string, type: 'products' | 'users'): Promise<void>;
}
declare const _default: MigrationService;
export default _default;
//# sourceMappingURL=MigrationService.d.ts.map