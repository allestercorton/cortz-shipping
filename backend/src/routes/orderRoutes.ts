import { Router } from 'express';
import { createOrder, getOrder } from '../controllers/orderController';
import { isAuth } from '../utils';

const router = Router();

router.get('/:id', isAuth, getOrder);
router.post('/', isAuth, createOrder);

export default router;
