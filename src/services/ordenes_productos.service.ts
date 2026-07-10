import { Prisma } from '../../generated/prisma/client.ts';
import { AppError } from '../errors/AppError.ts';
import { NotFoundError } from '../errors/NotFoundError.ts';
import type { Orden_ProductoData } from '../interfaces/Orden_Producto.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createOrdenProducto(data: Orden_ProductoData): Promise<Orden_ProductoData> {
  return await prisma.ordenes_productos.create({ data });
}

export async function findOrdenProductoById(id: number): Promise<Orden_ProductoData> {
  const ordenProducto: Orden_ProductoData | null = await prisma.ordenes_productos.findUnique({ where: { id } });
  if (!ordenProducto) throw new NotFoundError('Orden_Producto no encontrado');
  return ordenProducto;
}

export async function findAllOrdenesProductosByOrdenId(ordenId: number): Promise<Orden_ProductoData[]> {
  return await prisma.ordenes_productos.findMany({
    where: {
      ordenId,
    }
  });
}

export async function updateOrdenProducto(id: number, data: Partial<Orden_ProductoData>): Promise<Orden_ProductoData> {
  return await prisma.ordenes_productos.update({
    where: { id },
    data
  });
}

export async function deleteOrdenProducto(id: number): Promise<void> {
  await prisma.ordenes_productos.delete({ where: { id } });
}
