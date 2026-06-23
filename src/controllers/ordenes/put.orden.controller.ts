import express from 'express';
import { findOrdenById, updateOrdenById } from '../../services/ordenes.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import type { OrdenData } from '../../interfaces/Orden.interface.ts';
import * as AuthRequest from '../../interfaces/AuthRequest.ts';

type PutOrdenBody = {
    usuarioId?: number,
    estado?: "CARRITO" | "PAGO_PENDIENTE" | "PAGADA" | "CANCELADA",
    fecha?: Date,
    createdAt?: Date
}

export default async function updateOrden(req: AuthRequest.default, res: express.Response, next: express.NextFunction): Promise<void | Error> {
    try {

        const id: number = parseInt(req.params.ordenId as string);

        await checkOrdenOwner(id, req);

        const orden: OrdenData = await findOrdenById(id);
        if (req.user.rol === "USER") {
            if (orden.estado != "CARRITO") {
                throw new Error("No se puede modificar o eliminar una orden que ya no esté en carrito");
            }
        }

        const { createdAt, estado, fecha, usuarioId }: PutOrdenBody = req.body; //el campo "ordenes_productos" no se tiene que pasar por acá
        if (!createdAt && !estado && !fecha && !usuarioId) {
            return new Error("Al menos uno de los campos (createdAt, estado, fecha, usuarioId) es requerido");
        }

        await updateOrdenById(id, req.body);

        res.status(200).send("Orden correctamente actualizada");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
}
