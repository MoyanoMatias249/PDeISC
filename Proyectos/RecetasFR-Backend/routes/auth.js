// routes/auth.js
import { Router } from 'express';
import { register, login, socialLogin } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/social-login', socialLogin);

export default router;
