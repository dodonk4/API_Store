import * as OrdenData from '../interfaces/Orden.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createOrden(data: OrdenData.default): Promise<OrdenData.default> {
  try {
    return await prisma.ordenes.create({ data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear orden');
  }
}

export async function findAllOrdenes(): Promise<OrdenData.default[]> {
  try {
    return await prisma.ordenes.findMany();
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener ordenes');
  }
}

export async function findOrdenById(id: number): Promise<OrdenData.default> {
  try {
    const orden = await prisma.ordenes.findUnique({ where: { id } });
    if (!orden) throw new Error('Orden no encontrada');
    return orden;
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar orden');
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
