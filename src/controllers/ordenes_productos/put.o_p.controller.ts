import express from 'express';
import { findOrdenById, updateOrdenById } from '../../services/ordenes.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import { Decimal } from '@prisma/client/runtime/client';
import type { OrdenData } from '../../interfaces/Orden.interface.ts';
import { ConflictError } from '../../errors/ConflictError.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';
import { UnauthorizedError } from '../../errors/UnauthorizedError.ts';

type PutOrdenProductoBody = {
    cantidad?: number,
    ordenId?: number,
    precioUnitario?: Decimal,
    productId?: number
}

export default async function updateOrdenProductoController(req: express.Request, res: express.Response) {

    //El "ordenIdParams" indica el ID de la orden a la que pertenece el orden_producto que se desea modificar
    //El ordenId (del req.body) indica el ID de la orden a la que se caambiaría el orden_producto
    const ordenIdParams: number = parseInt(req.params.ordenId as string);
    const ordenProductoId: number = parseInt(req.params.ordenId as string);

    const { cantidad, ordenId, precioUnitario, productId }: PutOrdenProductoBody = req.body;
    if (!cantidad && !ordenId && !precioUnitario && !productId) {
        throw new BadRequestError("Al menos uno de los campos (cantidad, ordenId, precioUnitario, productId) es requerido");
    }

    await checkOrdenOwner(ordenIdParams, req);
    const orden: OrdenData = await findOrdenById(ordenIdParams);

    if (req.user?.rol === "USER") {
        if (orden.estado != "CARRITO") {
            throw new ConflictError("No se puede modificar o eliminar un producto de una orden que ya no esté en carrito");
        }

        if (precioUnitario) {
            throw new UnauthorizedError("No tienes permisos para modificar el precio unitario del producto pedido en la orden");
        }
    }

    await updateOrdenById(ordenProductoId, req.body);

    res.status(200).send("Producto de la orden correctamente actualizado");

}
