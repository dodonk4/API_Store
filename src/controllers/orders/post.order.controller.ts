import express from 'express';
import type { OrderData } from '../../interfaces/Order.interface.ts';
import { createOrder } from '../../services/orders.service.ts';
import { UnauthorizedError } from '../../errors/UnauthorizedError.ts';
//Sí, se puede crear una orden sin aclarar nada
type PostOrderBody = {
  userId: number,
  state: "CART" | "PENDING_PAYMENT" | "PAID" | "CANCELED",
  date: Date
}

export default async function postOrder(req: express.Request, res: express.Response): Promise<void | express.Response> {

  //Si no hay userId, se entiende que se quiere crear una orden para el propio usuario
  //Si hay userId, el usuario debe ser un ADMIN para crear una orden a otro usuario

  if(!req.user){
    throw new Error("No hay usuario logueado");
  }

  let { userId, state, date }: PostOrderBody = req.body;

  if (req.user?.rol === 'USER') {
    if (userId && userId != req.user.id) {
      throw new UnauthorizedError("No tienes los permisos para crear una orden para otro usuario que no sea el logueado");
    }
  }

  //'state' tiene como default a PENDING en la base de datos

  if (!date) {
    date = new Date();
  }


  if (!userId) {
    userId = req.user?.id;
  }

  //El arreglo para el state hace que sea enviado únicamente cuando no es undefined
  const resultOrder: OrderData = await createOrder({ userId, ...(state !== undefined && { state }), date });

  res.status(200).json({ resultOrder });

}
