import type { CreateOrdenData, OrdenData } from '../interfaces/Orden.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createOrden(data: CreateOrdenData): Promise<OrdenData> {
  try {
    return await prisma.ordenes.create({ data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear orden');
  }
}

export async function findAllOrdenes(): Promise<OrdenData[]> {
  try {
    return await prisma.ordenes.findMany();
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener ordenes');
  }
}

export async function findOrdenById(id: number): Promise<OrdenData> {
  try {
    const orden: OrdenData | null  = await prisma.ordenes.findUnique({ where: { id } });
    if (!orden) throw new Error('Orden no encontrada');
    return orden;
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar orden');
  }
}

//La data que llega acá para actualizar no puede tener productos. Después se tiene que controlar en el
//controlador o en zod.
export async function updateOrdenById(id: number, data: Partial<OrdenData>) {
  try {
    await prisma.ordenes.update({ where: { id }, data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al intentar actualizar la orden');
  }
}

export async function deleteOrden(id: number): Promise<void> {
  try {
    await prisma.ordenes.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    throw new Error('Error al borrar la orden');
  }
}
