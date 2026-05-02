import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import * as stockController from '../controllers/stock.controller.js';

const router = Router();

router.use(authenticate);

router.get('/', stockController.getAll);
router.post('/', requireRole('admin'), stockController.create);
router.patch('/:id', requireRole('admin'), stockController.update);
router.delete('/:id', requireRole('admin'), stockController.remove);

export default router;
