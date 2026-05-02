import { Router } from 'express';
import { authRateLimiter } from '../middlewares/rateLimiter.js';
import { authenticate } from '../middlewares/auth.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authRateLimiter, authController.register);
router.post('/login', authRateLimiter, authController.login);
router.post('/refresh', authRateLimiter, authController.refresh);
router.post('/logout', authenticate, authController.logout);

export default router;
