"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Instancia global del cliente Prisma ORM para interactuar con la base de datos.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
// Instancia singleton de PrismaClient para toda la aplicación
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = prisma;
//# sourceMappingURL=prisma.js.map