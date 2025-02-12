import { CartItem } from './types/Cart';
import { Product } from './types/Product';

export const getError = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const err = error as {
      message: string;
      response?: { data?: { message?: string } };
    };
    return err.response?.data?.message || err.message;
  }
  return 'An unknown error occurred';
};

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  };
  return cartItem;
};
