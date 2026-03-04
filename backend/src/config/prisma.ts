// Instancia singleton de PrismaClient para toda la aplicación
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
