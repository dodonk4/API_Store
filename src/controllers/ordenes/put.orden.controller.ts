import express from 'express';
import { findOrdenById, updateOrdenById } from '../../services/ordenes.service.ts';
import * as OrdenData from '../../interfaces/Orden.interface.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';

export default async function updateOrden(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void | Error> {
    try {

        const id = parseInt(req.params.ordenId as string);

        await checkOrdenOwner(id, req);

        const { createdAt, estado, fecha, usuarioId } = req.body; //el campo "ordenes_productos" no se tiene que pasar por acá
        if (!createdAt && !estado && !fecha && !usuarioId) {
            return new Error("Al menos uno de los campos (ordenId, productId, precioUnitario, cantidad) es requerido");
        }

        await updateOrdenById(id, req.body);

        res.status(200).send("Orden correctamente actualizada");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
}
