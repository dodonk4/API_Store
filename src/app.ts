import express from 'express';
import authRouter from './routes/auth.router.ts';
import productsRouter from './routes/products.router.ts';
import usersRouter from './routes/users.router.ts';
import ordersRouter from './routes/orders.router.ts';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.middleware.ts';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.ts';

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'API Store' });
});

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(errorHandler);

export { app };

