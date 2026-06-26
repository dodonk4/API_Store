import { NotFoundError } from '../errors/NotFoundError.ts';
import type { CreateOrdenData, OrdenData } from '../interfaces/Orden.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createOrden(data: CreateOrdenData): Promise<OrdenData> {
  return await prisma.ordenes.create({ data });
}

export async function findAllOrdenes(): Promise<OrdenData[]> {
  return await prisma.ordenes.findMany();
}

export async function findOrdenById(id: number): Promise<OrdenData> {
  const orden: OrdenData | null = await prisma.ordenes.findUnique({ where: { id } });
  if (!orden) throw new NotFoundError('Orden no encontrada');
  return orden;
}

//La data que llega acá para actualizar no puede tener productos. Después se tiene que controlar en el
//controlador o en zod.
export async function updateOrdenById(id: number, data: Partial<OrdenData>) {
  await prisma.ordenes.update({ where: { id }, data });
}

export async function deleteOrden(id: number): Promise<void> {
  await prisma.ordenes.delete({ where: { id } });
}
