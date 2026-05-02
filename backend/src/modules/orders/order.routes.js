import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.js';
import { requireRole } from '../../middlewares/roles.js';
import * as orderController from './order.controller.js';

const router = Router();

router.use(authenticate);

router.get('/', orderController.getAll);
router.post('/', requireRole('admin', 'empleado'), orderController.create);
router.get('/:id', orderController.getById);
router.patch('/:id/status', requireRole('admin', 'empleado'), orderController.updateStatus);

export default router;
