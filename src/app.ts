import express from 'express';
import authRouter from './routes/auth.router.ts';
import productsRouter from './routes/products.ts';
import usersRouter from './routes/users.ts';
import ordersRouter from './routes/orders.ts';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.middleware.ts';

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'API de Tienda' });
});

app.use(errorHandler);

export {app};