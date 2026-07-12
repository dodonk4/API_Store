import express from 'express';
import type { Order_ProductData } from '../interfaces/Order_Product.interface.ts';
import { findOrderProductById } from '../services/orders_products.service.ts';
import { UnauthorizedError } from '../errors/UnauthorizedError.ts';
import { ConflictError } from '../errors/ConflictError.ts';

export async function checkOrderProductOwner(orderProductId: number, orderId: number, req: express.Request): Promise<void | Error> {
  if (!req.user) {
    throw new UnauthorizedError("Tiene que haber un usuario logueado");
  }

  if (req.user.rol != "ADMIN") {
    const orderProduct: Order_ProductData = await findOrderProductById(orderProductId);

    if (orderProduct.orderId != orderId) {
      throw new ConflictError("El order_product no corresponde a la orden que se está accediendo");
    }
  }

}