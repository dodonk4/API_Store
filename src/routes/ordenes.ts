import express from 'express';
import Orden from '../models/Orden.ts';

const router = express.Router();

// GET /ordenes (obtener todas)
router.get('/', (req: express.Request, res: express.Response) => {
  Orden.findAll((err : Error | null, ordenes : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(ordenes || []);
  });
});

// POST /ordenes
router.post('/', (req: express.Request, res: express.Response) => {
  const { usuarioId, productos } = req.body;
  if (!usuarioId || !productos || !Array.isArray(productos)) {
    return res.status(400).json({ error: 'usuarioId y productos son requeridos' });
  }
  Orden.create(req.body, (err : Error | null, orden : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(orden);
  });
});

router.post('/postgreSQL', (req: express.Request, res: express.Response) => {
  const { usuarioId, productos } = req.body;
  if (!usuarioId || !productos || !Array.isArray(productos)) {
    return res.status(400).json({ error: 'usuarioId y productos son requeridos' });
  }
  Orden.create(req.body, (err : Error | null, orden : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(orden);
  });
});

// GET /ordenes/:ordenId
router.get('/:ordenId', (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.ordenId as string);
  Orden.findById(id, (err : Error | null, orden : any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });
    res.json(orden);
  });
});

// PUT /ordenes/:ordenId
router.put('/:ordenId', (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.ordenId as string);
  Orden.findById(id, (err : Error | null, orden : any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });
    
    const { productos } = req.body;
    if (!productos || !Array.isArray(productos)) {
      return res.status(400).json({ error: 'productos son requeridos' });
    }
    Orden.update(id, req.body, (err : Error | null, orden : any) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(orden);
    });

  });
  
});

// DELETE /ordenes/:ordenId
router.delete('/:ordenId', (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.ordenId as string);
  Orden.delete(id, (err : Error | null) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
});

export default router;