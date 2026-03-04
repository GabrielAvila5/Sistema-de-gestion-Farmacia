import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

// Ruta de login
router.post('/login', authController.login);

export default router;
