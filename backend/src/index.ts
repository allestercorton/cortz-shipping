import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';
import seedRouter from './routes/seedRouter';

const MONGO_URI = process.env.MONGO_URI;
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

app.use('/api/products', productRoutes);
app.use('/api/seed', seedRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
