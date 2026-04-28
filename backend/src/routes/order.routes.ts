import { Router } from 'express';
import { createOrder, updateOrderStatus } from '../controllers/order.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

router.post('/', authenticate, createOrder);
router.patch('/:orderId/status', authenticate, updateOrderStatus);

export default router;
