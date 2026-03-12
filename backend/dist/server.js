"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Punto de entrada principal del backend. Inicia el servidor HTTP y escucha conexiones.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
// Carga las variables de entorno PRIMERO, antes de cualquier otra importación
// Usamos require directo para garantizar que se ejecute antes de que
// PrismaClient se instancie (las importaciones ES se hoistean)
require('dotenv').config();
// Importa la aplicación configurada (middlewares y rutas)
const app_1 = __importDefault(require("./app"));
// Cliente Prisma para verificar conexión a la base de datos
const prisma_1 = __importDefault(require("./config/prisma"));
// Usa el puerto definido en .env o 5000 como valor por defecto
const PORT = process.env.PORT || 5000;
// Verifica la conexión a MariaDB e inicia el servidor
async function main() {
    try {
        await prisma_1.default.$connect();
        console.log('MariaDB Connected via Prisma');
        app_1.default.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map