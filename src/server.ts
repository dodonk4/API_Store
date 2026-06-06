import express from 'express';
import authRouter from './routes/auth.router.ts';
import productosRouter from './routes/productos.ts';
import usuariosRouter from './routes/usuarios.ts';
import ordenesRouter from './routes/ordenes.ts';
import './database/init.ts'; // Inicializar base de datos
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/auth', authRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/ordenes', ordenesRouter);

// Ruta raíz
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'API de Tienda' });
});

// Manejo de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});