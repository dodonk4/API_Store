import express from 'express';
import { findOrderById, updateOrderById } from '../../services/orders.service.ts';
import type { OrderData } from '../../interfaces/Order.interface.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';
import { ConflictError } from '../../errors/ConflictError.ts';
import { checkOrderOwner } from '../../utils/checkOrderOwner.utils.ts';

type PutOrderBody = {
    userId?: number,
    state?: "CART" | "PENDING_PAYMENT" | "PAID" | "CANCELED",
    date?: Date,
    createdAt?: Date
}

export default async function updateOrder(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void | Error> {

    const id: number = parseInt(req.params.orderId as string);

    await checkOrderOwner(id, req);

    const order: OrderData = await findOrderById(id);
    if (req.user?.rol === "USER") {
        if (order.state != "CART") {
            throw new ConflictError("No se puede modificar o eliminar una orden que ya no esté en carrito");
        }
    }

    const { createdAt, state, date, userId }: PutOrderBody = req.body; //el campo "orders_products" no se tiene que pasar por acá
    if (!createdAt && !state && !date && !userId) {
        return new BadRequestError("Al menos uno de los campos (createdAt, state, date, userId) es requerido");
    }

    await updateOrderById(id, req.body);

    res.status(200).send("Orden correctamente actualizada");

}
