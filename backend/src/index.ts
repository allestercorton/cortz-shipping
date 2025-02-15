import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import seedRoute from './routes/seedRoute';
import keyRoutes from './routes/keyRoutes';

const MONGO_URI = process.env.MONGO_URI;
console.log('MongoDB URI:', MONGO_URI);

mongoose.set('strictQuery', true);
mongoose
  .connect(MONGO_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('MongoDB Connection Failed'));

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seed', seedRoute);
app.use('/api/keys', keyRoutes);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
);

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
