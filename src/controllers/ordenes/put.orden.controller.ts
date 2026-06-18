import express from 'express';
import { updateOrdenById } from '../../services/ordenes.service';

export default async function updateOrden(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id = parseInt(req.params.productoId as string);
        const { usuarioId, estado, fecha } = req.body;
        if (!usuarioId && !estado && !fecha) {
            return res.status(400).json({ error: 'Al menos uno de los campos (usuarioId, estado, fecha) es requerido' });
        }
        await updateOrdenById(id, req.body);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
}

