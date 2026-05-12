import express, { Request, Response } from 'express';
import Usuario from '../models/Usuario';

const router = express.Router();

// GET /usuarios (obtener todos)
router.get('/', (req: Request, res: Response) => {
  Usuario.findAll((err : Error | null, usuarios : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(usuarios || []);
  });
});

// POST /usuarios
router.post('/', (req: Request, res: Response) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }
  Usuario.create(req.body, (err : Error | null, usuario : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(usuario);
  });
});

// GET /usuarios/:usuarioId
router.get('/:usuarioId', (req: Request, res: Response) => {
  const id = parseInt(req.params.usuarioId as string);
  Usuario.findById(id, (err : Error | null, usuario : any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  });
});

// PUT /usuarios/:usuarioId
router.put('/:usuarioId', (req: Request, res: Response) => {
  const id = parseInt(req.params.usuarioId as string);
  const { nombre, email } = req.body;
  if (!nombre && !email) {
    return res.status(400).json({ error: 'Nombre o email es requerido' });
  }
  Usuario.update(id, req.body, (err : Error | null, usuario : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(usuario);
  });
});

// DELETE /usuarios/:usuarioId
router.delete('/:usuarioId', (req: Request, res: Response) => {
  const id = parseInt(req.params.usuarioId as string);
  Usuario.delete(id, (err : Error | null) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
});

export default router;