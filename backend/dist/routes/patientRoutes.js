"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Define los endpoints (rutas) de la API para patient y enlaza sus respectivos controladores.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
// Middleware de protección: Solo usuarios logueados pueden acceder a pacientes
router.use(authMiddleware_1.authenticate);
// Restricción dura: ESTRICTAMENTE Admin y Doctores (Empleados recibirán 403 Forbidden)
router.use((0, roleMiddleware_1.checkRole)(['admin', 'doctor']));
const patientController_1 = require("../controllers/patientController");
const validateBody_1 = require("../middlewares/validateBody");
const patient_validator_1 = require("../validators/patient.validator");
// Endpoints (Protegidos)
router.get('/', patientController_1.getPatients);
router.post('/', (0, validateBody_1.validateBody)(patient_validator_1.createPatientSchema), patientController_1.createPatient);
router.get('/search', patientController_1.searchPatients);
router.get('/:id', patientController_1.getPatientById);
router.put('/:id', (0, validateBody_1.validateBody)(patient_validator_1.updatePatientSchema), patientController_1.updatePatient);
router.delete('/:id', patientController_1.deletePatient);
exports.default = router;
//# sourceMappingURL=patientRoutes.js.map