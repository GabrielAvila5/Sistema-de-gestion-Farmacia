"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultationController_1 = require("../controllers/consultationController");
const validateBody_1 = require("../middlewares/validateBody");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const consultation_validator_1 = require("../validators/consultation.validator");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticate);
router.post('/', (0, roleMiddleware_1.checkRole)(['admin', 'doctor']), (0, validateBody_1.validateBody)(consultation_validator_1.createConsultationSchema), consultationController_1.createConsultation);
router.get('/patient/:patientId', (0, roleMiddleware_1.checkRole)(['admin', 'doctor', 'employee']), consultationController_1.getConsultationsByPatient);
router.get('/:id', (0, roleMiddleware_1.checkRole)(['admin', 'doctor', 'employee']), consultationController_1.getConsultationById);
exports.default = router;
//# sourceMappingURL=consultationRoutes.js.map