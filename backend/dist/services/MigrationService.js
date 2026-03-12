"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Servicio que encapsula la lógica de negocio y consultas a la base de datos para la entidad de Migration.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const prisma_1 = __importDefault(require("../config/prisma"));
const fs_1 = __importDefault(require("fs"));
// Servicio para importar datos masivos desde archivos JSON a la base de datos
class MigrationService {
    /**
     * Importa datos desde un archivo JSON hacia la tabla correspondiente.
     * @param filePath - Ruta al archivo JSON con los datos.
     * @param type - Tipo de datos: 'products' o 'users'.
     */
    async importData(filePath, type) {
        try {
            // Lee y parsea el archivo JSON desde el sistema de archivos
            const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
            if (type === 'products') {
                // Inserta todos los productos de una vez (operación masiva)
                await prisma_1.default.products.createMany({ data });
                console.log('Products Imported!');
            }
            else if (type === 'users') {
                // Inserta todos los usuarios de una vez
                await prisma_1.default.users.createMany({ data });
                console.log('Users Imported!');
            }
            else {
                throw new Error('Invalid data type. Use "products" or "users".');
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Error with data import: ${message}`);
            throw error;
        }
    }
}
// Exporta una única instancia del servicio (patrón singleton)
exports.default = new MigrationService();
//# sourceMappingURL=MigrationService.js.map