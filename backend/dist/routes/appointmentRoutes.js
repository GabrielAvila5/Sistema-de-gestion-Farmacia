"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Define los endpoints (rutas) de la API para appointment y enlaza sus respectivos controladores.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
// Middleware de protección general
router.use(authMiddleware_1.authenticate);
// Restricción dura: ESTRICTAMENTE Admin y Doctores (Empleados bloqueados al igual que en pacientes)
router.use((0, roleMiddleware_1.checkRole)(['admin', 'doctor']));
const appointmentController_1 = require("../controllers/appointmentController");
const validateBody_1 = require("../middlewares/validateBody");
const appointment_validator_1 = require("../validators/appointment.validator");
// Endpoints (Protegidos)
router.get('/', appointmentController_1.getAppointments);
router.post('/', (0, validateBody_1.validateBody)(appointment_validator_1.createAppointmentSchema), appointmentController_1.createAppointment);
router.get('/:id', appointmentController_1.getAppointmentById);
router.put('/:id', (0, validateBody_1.validateBody)(appointment_validator_1.updateAppointmentSchema), appointmentController_1.updateAppointment);
router.delete('/:id', appointmentController_1.deleteAppointment);
exports.default = router;
//# sourceMappingURL=appointmentRoutes.js.map