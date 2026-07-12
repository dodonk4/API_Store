import { NotFoundError } from '../errors/NotFoundError.ts';
import type { Order_ProductData } from '../interfaces/Order_Product.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createOrderProduct(data: Order_ProductData): Promise<Order_ProductData> {
  return await prisma.orders_products.create({ data });
}

export async function findOrderProductById(id: number): Promise<Order_ProductData> {
  const orderProduct: Order_ProductData | null = await prisma.orders_products.findUnique({ where: { id } });
  if (!orderProduct) throw new NotFoundError('Order_Product no encontrado');
  return orderProduct;
}

export async function findAllOrdersProductsByOrderId(orderId: number): Promise<Order_ProductData[]> {
  return await prisma.orders_products.findMany({
    where: {
      orderId,
    }
  });
}

export async function updateOrderProduct(id: number, data: Partial<Order_ProductData>): Promise<Order_ProductData> {
  const orderProduct: Order_ProductData | null = await prisma.orders_products.findUnique({ where: { id } });
  if (!orderProduct) throw new NotFoundError('Order_Product no encontrado');
  return await prisma.orders_products.update({
    where: { id },
    data
  });
}

export async function deleteOrderProduct(id: number): Promise<void> {
  const orderProduct: Order_ProductData | null = await prisma.orders_products.findUnique({ where: { id } });
  if (!orderProduct) throw new NotFoundError('Order_Product no encontrado');
  await prisma.orders_products.delete({ where: { id } });
}
