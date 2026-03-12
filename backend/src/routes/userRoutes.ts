/**
 * @fileoverview Define los endpoints (rutas) de la API para user y enlaza sus respectivos controladores.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
import express from 'express';
import { getUsers, createUser, toggleUserActive } from '../controllers/userController';
import { createUserSchema } from '../validators/user.validator';
import { validateBody } from '../middlewares/validateBody';
import { authenticate } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';

const router = express.Router();

// Todas las rutas de usuarios requieren autenticación + rol admin
router.use(authenticate);
router.use(checkRole(['admin']));

// GET /api/users — Listar todos los usuarios
router.get('/', getUsers);

// POST /api/users — Crear usuario
router.post('/', validateBody(createUserSchema), createUser);

// PATCH /api/users/:id/toggle-active — Activar/Desactivar
router.patch('/:id/toggle-active', toggleUserActive);

export default router;
