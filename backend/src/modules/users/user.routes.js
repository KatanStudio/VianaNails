import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.js';
import { requireRole } from '../../middlewares/roles.js';
import * as userController from './user.controller.js';

const router = Router();

router.use(authenticate);

router.get('/', requireRole('admin'), userController.getAll);

router.get('/:id', (req, res, next) => {
  // Admin puede ver cualquier usuario; el propio usuario solo el suyo
  if (req.user.role === 'admin' || req.user.sub === req.params.id) {
    return userController.getById(req, res, next);
  }
  return res.status(403).json({ message: 'Permisos insuficientes' });
});

router.patch('/:id', (req, res, next) => {
  if (req.user.role === 'admin' || req.user.sub === req.params.id) {
    return userController.update(req, res, next);
  }
  return res.status(403).json({ message: 'Permisos insuficientes' });
});

export default router;
