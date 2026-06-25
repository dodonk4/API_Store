import { Prisma } from '../../generated/prisma/client.ts';
import type { Orden_ProductoData } from '../interfaces/Orden_Producto.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createOrdenProducto(data: Orden_ProductoData): Promise<Orden_ProductoData> {
  try {
    return await prisma.ordenes_productos.create({ data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear orden_producto');
  }
}

export async function findOrdenProductoById(id: number): Promise<Orden_ProductoData> {
  try {
    const ordenProducto: Orden_ProductoData | null = await prisma.ordenes_productos.findUnique({ where: { id } });
    if (!ordenProducto) throw new Error('Orden_Producto no encontrado');
    return ordenProducto;
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar orden_producto');
  }
}

export async function findAllOrdenesProductosByOrdenId(ordenId: number): Promise<Orden_ProductoData[]> {
  try {
    return await prisma.ordenes_productos.findMany({
      where: {
        ordenId,
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener ordenes');
  }
}

export async function updateOrdenProducto(id: number, data: Partial<Orden_ProductoData>): Promise<Orden_ProductoData> {
  try {
    return await prisma.ordenes_productos.update({
      where: { id },
      data
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar orden_producto');
  }
}

export async function deleteOrdenProducto(id: number): Promise<void> {
  try {
    await prisma.ordenes_productos.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar orden_producto');
  }
}
