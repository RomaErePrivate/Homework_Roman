import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

// @ts-ignore
router.post('/register', register);
// @ts-ignore
router.post('/login', login);

export default router;