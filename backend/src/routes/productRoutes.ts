import { Router } from 'express';
import { getProducts, getOneProduct } from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/slug/:slug', getOneProduct);

export default router;
