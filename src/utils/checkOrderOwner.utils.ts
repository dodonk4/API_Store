import express from 'express';
import { findOrderById } from '../services/orders.service.ts';
import type { OrderData } from '../interfaces/Order.interface.ts';
import { UnauthorizedError } from '../errors/UnauthorizedError.ts';
import { ForbiddenError } from '../errors/ForbiddenError.ts';

export async function checkOrderOwner(id: number, req: express.Request): Promise<void | Error> {
  if (!req.user) {
    throw new UnauthorizedError("Tiene que haber un usuario logueado");
  }

  if (req.user.rol != "ADMIN") {
    const order: OrderData = await findOrderById(id);

    //Corroborar que el origen ID le corresponde al usuario logueado
    if (order.userId != req.user.id) {
      throw new ForbiddenError("El usuario logueado no tiene permisos para acceder a la orden");
    }

  }

}