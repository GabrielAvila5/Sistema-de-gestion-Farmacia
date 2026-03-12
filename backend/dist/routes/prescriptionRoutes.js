"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Define los endpoints (rutas) de la API para prescription y enlaza sus respectivos controladores.
 * Descripción generada automáticamente para documentar la funcionalidad principal del archivo.
 */
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const prescriptionController_1 = require("../controllers/prescriptionController");
const validateBody_1 = require("../middlewares/validateBody");
const prescription_validator_1 = require("../validators/prescription.validator");
const router = express_1.default.Router();
// Middleware globales del router
router.use(authMiddleware_1.authenticate);
router.use((0, roleMiddleware_1.checkRole)(['admin', 'doctor'])); // Solo personal clínico
// Ruta que escupe el Buffer
router.post('/generate', (0, validateBody_1.validateBody)(prescription_validator_1.generatePrescriptionSchema), prescriptionController_1.generatePrescriptionPdf);
exports.default = router;
//# sourceMappingURL=prescriptionRoutes.js.map