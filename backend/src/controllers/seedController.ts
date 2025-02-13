import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/productModel';
import { UserModel } from '../models/userModel';
import { sampleProducts, sampleUsers } from '../data';

export const seedDatabase = asyncHandler(
  async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);

    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);

    res.json({ createdProducts, createdUsers });
  }
);
