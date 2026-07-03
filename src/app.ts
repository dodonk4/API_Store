import express from 'express';
import authRouter from './routes/auth.router.ts';
import productosRouter from './routes/productos.ts';
import usuariosRouter from './routes/usuarios.ts';
import ordenesRouter from './routes/ordenes.ts';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.middleware.ts';

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/ordenes', ordenesRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'API de Tienda' });
});

app.use(errorHandler);

export {app};