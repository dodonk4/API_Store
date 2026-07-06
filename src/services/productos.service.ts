import { NotFoundError } from '../errors/NotFoundError.ts';
import type { CreateProductoData, ProductoData } from '../interfaces/Producto.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createProducto(data: CreateProductoData): Promise<ProductoData> {
  return await prisma.productos.create({ data });
}

export async function findProductoById(id: number): Promise<ProductoData> {
  const producto: ProductoData | null = await prisma.productos.findUnique({ where: { id } });
  if (!producto) throw new NotFoundError('Producto no encontrado');
  return producto;
}

export async function findAllProductos(): Promise<ProductoData[]> {
  return await prisma.productos.findMany();
}

export async function updateProducto(id: number, data: Partial<ProductoData>): Promise<ProductoData> {
  const producto: ProductoData | null = await prisma.productos.findUnique({ where: { id } });
  if (!producto) throw new NotFoundError('Producto no encontrado');
  return await prisma.productos.update({ where: { id }, data });
}

export async function deleteProducto(id: number): Promise<void> {
  const producto: ProductoData | null = await prisma.productos.findUnique({ where: { id } });
  if (!producto) throw new NotFoundError('Producto no encontrado');
  await prisma.productos.delete({ where: { id } });
}
