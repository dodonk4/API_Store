import express from 'express';
import Usuario from '../../models/Usuario.model.ts';
export default function putUsuario(req: express.Request, res: express.Response): void | express.Response {
  const id = parseInt(req.params.usuarioId as string);
  const { nombre, email } = req.body;
  if (!nombre && !email) {
    return res.status(400).json({ error: 'Nombre o email es requerido' });
  }
  Usuario.update(id, req.body, (err : Error | null, usuario : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(usuario);
  });
}
