import { NotFoundError } from '../errors/NotFoundError.ts';
import type { CreateOrderData, OrderData } from '../interfaces/Order.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createOrder(data: CreateOrderData): Promise<OrderData> {
  return await prisma.orders.create({ data });
}

export async function findAllOrders(): Promise<OrderData[]> {
  return await prisma.orders.findMany();
}

export async function findOrderById(id: number): Promise<OrderData> {
  const order: OrderData | null = await prisma.orders.findUnique({ where: { id } });
  if (!order) throw new NotFoundError('Orden no encontrada')
  return order;
}

//La data que llega acá para actualizar no puede tener productos. Después se tiene que controlar en el
//controlador o en zod.
export async function updateOrderById(id: number, data: Partial<OrderData>) {
  await prisma.orders.update({ where: { id }, data });
}

export async function deleteOrder(id: number): Promise<void> {
  const order: OrderData | null = await prisma.orders.findUnique({ where: { id } });
  if (!order) throw new NotFoundError('Orden no encontrada');

  await prisma.orders_products.deleteMany({
    where: {
      orderId: 3,
    },
  });
  
  await prisma.orders.delete({ where: { id } });
}
