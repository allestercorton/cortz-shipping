import { Router } from 'express';
import { getPayPalKey } from '../controllers/keyController';

const router = Router();

router.get('/paypal', getPayPalKey);

export default router;
