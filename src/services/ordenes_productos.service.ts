import { Prisma } from '../../generated/prisma/client.ts';
import * as OrdenData from '../interfaces/Orden.interface.ts';
import * as Orden_ProductoData from '../interfaces/Orden_Producto.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createOrdenProducto(data: Orden_ProductoData.default): Promise<Orden_ProductoData.default> {
  try {
    return await prisma.ordenes_productos.create({ data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear orden_producto');
  }
}

export async function createOrdenesProductosBulk(data: Orden_ProductoData.default[]): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.ordenes_productos.createMany({ data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear varios orden_producto');
  }
}

export async function findOrdenProductoById(id: number): Promise<Orden_ProductoData.default> {
  try {
    const ordenProducto = await prisma.ordenes_productos.findUnique({ where: { id } });
    if (!ordenProducto) throw new Error('Orden_Producto no encontrado');
    return ordenProducto;
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar orden_producto');
  }
}

export async function findAllOrdenesByOrdenId(ordenId: number): Promise<OrdenData.default[]> {
  try {
    return await prisma.ordenes.findMany({
      where: {
        usuarioId: ordenId,
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener ordenes');
  }
}

export async function updateOrdenProducto(id: number, data: Partial<Orden_ProductoData.default>): Promise<Orden_ProductoData.default> {
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
