import bcrypt from 'bcryptjs';
import { User } from './models/userModel';
import { Product } from './models/productModel';

export const sampleProducts: Product[] = [
  {
    name: 'Nike Slim Shirt',
    slug: 'nike-slim-shirt',
    category: 'Shirts',
    image: '/images/p1.png',
    price: 120,
    countInStock: 10,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    description: 'High quality shirt',
  },
  {
    name: 'Nike Flex Rep',
    slug: 'nike-flex-rep',
    category: 'Shirts',
    image: '/images/p2.png',
    price: 100,
    countInStock: 15,
    brand: 'Adidas',
    rating: 4.2,
    numReviews: 8,
    description: 'Comfortable and stylish fit shirt',
  },
  {
    name: 'Nike Sportswear',
    slug: 'nike-sportswear',
    category: 'Pants',
    image: '/images/p3.png',
    price: 30,
    countInStock: 20,
    brand: 'Puma',
    rating: 4.3,
    numReviews: 12,
    description: `Women's Slim Cropped T-Shirt`,
  },
  {
    name: 'Nike Pro 365',
    slug: `Women's 5" Shorts`,
    category: 'Pants',
    image: '/images/p4.png',
    price: 90,
    countInStock: 0,
    brand: 'Under Armour',
    rating: 4.6,
    numReviews: 15,
    description: 'Durable and comfortable joggers',
  },
];

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'John',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
];
