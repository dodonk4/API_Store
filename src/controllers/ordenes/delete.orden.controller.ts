import express from 'express';
import { prisma } from '../../lib/prisma.ts';
export default async function deleteOrden(req: express.Request, res: express.Response): Promise<void> {
  const id = parseInt(req.params.ordenId as string);
  try {
      await prisma.ordenes.delete({
        where: { id }
      })
    } catch (error: any) {
      console.error(error);
      res.status(error.status).json(error);
    }
}

