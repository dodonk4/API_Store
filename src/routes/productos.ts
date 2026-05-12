import express, { Request, Response } from 'express';
import Producto from '../models/Producto';

const router = express.Router();

// GET /productos (obtener todos)
router.get('/', (req: Request, res: Response) => {
  Producto.findAll((err : Error | null, productos : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(productos || []);
  });
});

// POST /productos
router.post('/', (req: Request, res: Response) => {
  const { nombre, descripcion, precio, stock } = req.body;
  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Nombre, precio y stock son requeridos' });
  }
  Producto.create(req.body, (err : Error | null, producto : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(producto);
  });
});

// GET /productos/:productoId
router.get('/:productoId', (req: Request, res: Response) => {
  const id = parseInt(req.params.productoId as string);
  Producto.findById(id, (err : Error | null, producto : any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  });
});

// PUT /productos/:productoId
router.put('/:productoId', (req: Request, res: Response) => {
  const id = parseInt(req.params.productoId as string);
  const { nombre, descripcion, precio, stock } = req.body;
  if (!nombre && precio === undefined && stock === undefined && !descripcion) {
    return res.status(400).json({ error: 'Al menos uno de los campos (nombre, descripcion, precio, stock) es requerido' });
  }
  Producto.update(id, req.body, (err : Error | null, producto : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(producto);
  });
});

// DELETE /productos/:productoId
router.delete('/:productoId', (req: Request, res: Response) => {
  const id = parseInt(req.params.productoId as string);
  Producto.delete(id, (err : Error | null) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
});

export default router;