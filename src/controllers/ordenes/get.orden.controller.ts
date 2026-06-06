import express from 'express';
import Orden from '../../models/Orden.model.ts';
import { prisma } from '../../lib/prisma.ts';
import * as OrdenData from '../../interfaces/Orden.interface.ts';

export async function getAllOrdenes(req: express.Request, res: express.Response): Promise<void> {
  try {
    const result = await prisma.ordenes.findMany();
    res.send(result);
  } catch (error: any) {
    console.error(error);
    res.status(error.status).json({error});
  }
}

export async function getOrdenById(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = parseInt(req.params.ordenId as string);
    const result: OrdenData.default | null = await prisma.ordenes.findUnique({ where: { id } });
    if (!result) {
      const error: any = new Error("Orden no encontrada");
      error.status = 404;
      throw error;
    }

  } catch (error: any) {
    console.error(error);
    res.status(error.status).json({error});
  }
}

