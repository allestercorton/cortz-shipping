import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/productModel';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});

export const getOneProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findOne({ slug: req.params.slug });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
