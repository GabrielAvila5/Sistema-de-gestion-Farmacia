"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Define los endpoints (rutas) de la API para user y enlaza sus respectivos controladores.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const user_validator_1 = require("../validators/user.validator");
const validateBody_1 = require("../middlewares/validateBody");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
// Todas las rutas de usuarios requieren autenticación + rol admin
router.use(authMiddleware_1.authenticate);
router.use((0, roleMiddleware_1.checkRole)(['admin']));
// GET /api/users — Listar todos los usuarios
router.get('/', userController_1.getUsers);
// POST /api/users — Crear usuario
router.post('/', (0, validateBody_1.validateBody)(user_validator_1.createUserSchema), userController_1.createUser);
// PATCH /api/users/:id/toggle-active — Activar/Desactivar
router.patch('/:id/toggle-active', userController_1.toggleUserActive);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map