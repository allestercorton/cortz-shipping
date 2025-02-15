import { Router } from 'express';
import { createOrder } from '../controllers/orderController';
import { isAuth } from '../utils';

const router = Router();

router.post('/', isAuth, createOrder);

export default router;
