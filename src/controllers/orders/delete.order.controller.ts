import express from 'express';
import { deleteOrden, findOrderById } from '../../services/orders.service.ts';
import { checkOrderOwner } from '../../utils/checkOrderOwner.utils.ts';
import type { OrderData } from '../../interfaces/Order.interface.ts';
import { ConflictError } from '../../errors/ConflictError.ts';


export default async function deleteOrdenController(req: express.Request, res: express.Response): Promise<void | Error> {

  const id: number = parseInt(req.params.ordenId as string);

  await checkOrderOwner(id, req);
  const order: OrderData = await findOrderById(id);
  if (req.user?.rol === "USER") {
    if (order.state != "CART") {
      throw new ConflictError("No se puede modificar o eliminar una orden que ya no esté en carrito");
    }
  }

  await deleteOrden(id);
  res.status(204).send();

}

