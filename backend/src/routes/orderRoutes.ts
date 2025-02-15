import { Router } from 'express';
import {
  createOrder,
  getOrder,
  updateOrder,
  getMyOrders,
} from '../controllers/orderController';
import { isAuth } from '../utils';

const router = Router();

router.get('/mine', isAuth, getMyOrders);
router.get('/:id', isAuth, getOrder);
router.post('/', isAuth, createOrder);
router.put('/:id/pay', isAuth, updateOrder);

export default router;
