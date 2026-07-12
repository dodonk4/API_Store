import express from 'express';
import { deleteOrderProduct } from '../../services/orders_products.service.ts';
import { checkOrderOwner } from '../../utils/checkOrderOwner.utils.ts';
import { checkOrderProductOwner } from '../../utils/checkOrderProductOwner.utils.ts';
import { findOrderById } from '../../services/orders.service.ts';
import type { OrderData } from '../../interfaces/Order.interface.ts';
import { ConflictError } from '../../errors/ConflictError.ts';


export default async function deleteOrderProductController(req: express.Request, res: express.Response): Promise<void | Error> {

  const orderId: number = parseInt(req.params.orderId as string);
  const orderProductId: number = parseInt(req.params.orderProductId as string);

  //Corrobora que el usuario tenga permisos para modificar este o_p
  //Si es de él, puede. Sino, tiene que ser un ADMIN
  await checkOrderOwner(orderId, req);
  await checkOrderProductOwner(orderProductId, orderId, req);
  const order: OrderData = await findOrderById(orderId);
  if (req.user?.rol === "USER") {
    if (order.state != "CART") {
      throw new ConflictError("No se puede modificar o eliminar un producto de una orden que ya no esté en carrito");
    }
  }

  await deleteOrderProduct(orderProductId);
  res.status(204).send();

}