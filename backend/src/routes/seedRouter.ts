import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/productModel';
import { sampleProducts } from '../data';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);
    res.json({ createdProducts });
  })
);

export default router;
