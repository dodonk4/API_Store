import express from 'express';
import type { OrderData } from '../../interfaces/Order.interface.ts';
import { findAllOrders, findOrderById } from '../../services/orders.service.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';
import { checkOrderOwner } from '../../utils/checkOrderOwner.utils.ts';

export async function getAllOrders(req: express.Request, res: express.Response): Promise<void> {

  const result: OrderData[] = await findAllOrders();
  res.send(result);

}

export async function getOrderById(req: express.Request, res: express.Response): Promise<void> {

  const id: number = parseInt(req.params.orderId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El orderId debe ser un numero");
  }

  await checkOrderOwner(id, req);
  const result: OrderData = await findOrderById(id);
  res.json(result);

}

