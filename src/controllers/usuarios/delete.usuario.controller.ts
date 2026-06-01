import express from 'express';
import Usuario from '../../models/Usuario.model.ts';
export default function deleteUsuario(req: express.Request, res: express.Response): void {
  const id = parseInt(req.params.usuarioId as string);
  Usuario.delete(id, (err : Error | null) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log("vuelve");
    res.status(204).send();
  });
}
