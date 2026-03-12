import { Router } from 'express';
import { createConsultation, getConsultationsByPatient, getConsultationById } from '../controllers/consultationController';
import { validateBody } from '../middlewares/validateBody';
import { authenticate } from '../middlewares/authMiddleware';
import { checkRole } from '../middlewares/roleMiddleware';
import { createConsultationSchema } from '../validators/consultation.validator';

const router = Router();

router.use(authenticate);

router.post('/', checkRole(['admin', 'doctor']), validateBody(createConsultationSchema), createConsultation);
router.get('/patient/:patientId', checkRole(['admin', 'doctor', 'employee']), getConsultationsByPatient);
router.get('/:id', checkRole(['admin', 'doctor', 'employee']), getConsultationById);

export default router;
