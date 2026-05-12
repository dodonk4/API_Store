import express, { Request, Response, NextFunction } from 'express';
import productosRouter from './routes/productos';
import usuariosRouter from './routes/usuarios';
import ordenesRouter from './routes/ordenes';
import './database/init'; // Inicializar base de datos

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/ordenes', ordenesRouter);

// Ruta raíz
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API de Tienda' });
});

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});