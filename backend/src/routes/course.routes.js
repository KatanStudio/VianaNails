import { Router } from 'express';
import { authenticate, optionalAuthenticate } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import * as courseController from '../controllers/course.controller.js';

const router = Router();

// Rutas públicas — el catálogo no requiere autenticación
router.get('/', optionalAuthenticate, courseController.getAll);
router.get('/:slug', courseController.getBySlug);

// Rutas de administración
router.post('/', authenticate, requireRole('admin'), courseController.create);
router.patch('/:id', authenticate, requireRole('admin'), courseController.update);
router.delete('/:id', authenticate, requireRole('admin'), courseController.remove);

export default router;
