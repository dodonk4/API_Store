import { NotFoundError } from '../errors/NotFoundError.ts';
import type { CreateProductData, ProductData } from '../interfaces/Product.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createProduct(data: CreateProductData): Promise<ProductData> {
  return await prisma.products.create({ data });
}

export async function findProductById(id: number): Promise<ProductData> {
  const product: ProductData | null = await prisma.products.findUnique({ where: { id } });
  if (!product) throw new NotFoundError('Producto no encontrado');

  return product;
}

export async function findAllProducts(): Promise<ProductData[]> {
  return await prisma.products.findMany();
}

export async function updateProduct(id: number, data: Partial<ProductData>): Promise<ProductData> {
  const product: ProductData | null = await prisma.products.findUnique({ where: { id } });
  if (!product) throw new NotFoundError('Product no encontrado');
  return await prisma.products.update({ where: { id }, data });
}

export async function deleteProducto(id: number): Promise<void> {
  const product: ProductData | null = await prisma.products.findUnique({ where: { id } });
  if (!product) throw new NotFoundError('Product no encontrado');
  await prisma.products.delete({ where: { id } });
}
