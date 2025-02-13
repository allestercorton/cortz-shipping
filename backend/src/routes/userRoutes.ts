import { Router } from 'express';
import { signIn, signUp } from '../controllers/userController';

const router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;
