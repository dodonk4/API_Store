import { Prisma } from '../../generated/prisma/client.ts';
import * as ProductoData from '../interfaces/Producto.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createProducto(data: ProductoData.default): Promise<ProductoData.default> {
  try {
    return await prisma.productos.create({ data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear producto');
  }
}

export async function createProductosBulk(data: ProductoData.default[]): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.productos.createMany({ data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear varios productos');
  }
}

export async function findProductoById(id: number): Promise<ProductoData.default> {
  try {
    const producto = await prisma.productos.findUnique({ where: { id } });
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el producto');
  }
}

export async function findAllProductos(): Promise<ProductoData.default[]> {
  try {
    return await prisma.productos.findMany();
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los productos');
  }
}

export async function updateProducto(id: number, data: Partial<ProductoData.default>): Promise<ProductoData.default> {
  try {
    const producto = await prisma.productos.findUnique({ where: { id } });
    if (!producto) throw new Error('Producto no encontrado');
    return await prisma.productos.update({ where: { id }, data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el producto');
  }
}

export async function deleteProducto(id: number): Promise<void> {
  try {
    await prisma.productos.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el producto');
  }
}
