import express from 'express';
import { updateOrdenProducto } from '../../services/ordenes_productos.service';

export default async function updateOrdenProductoController(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const id = parseInt(req.params.productoId as string);
        const { ordenId, productId, precioUnitario, cantidad } = req.body;
        if (!ordenId && !productId && !precioUnitario && !cantidad) {
            return res.status(400).json({ error: 'Al menos uno de los campos (ordenId, productId, precioUnitario, cantidad) es requerido' });
        }
        await updateOrdenProducto(id, req.body);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
}
