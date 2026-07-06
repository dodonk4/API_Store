import express from 'express';
import { findOrdenById } from '../services/ordenes.service.ts';
import type { OrdenData } from '../interfaces/Orden.interface.ts';
import { UnauthorizedError } from '../errors/UnauthorizedError.ts';
import { ForbiddenError } from '../errors/ForbiddenError.ts';

export async function checkOrdenOwner(id: number, req: express.Request): Promise<void | Error> {
  if (!req.user) {
    throw new UnauthorizedError("Tiene que haber un usuario logueado");
  }

  if (req.user.rol != "ADMIN") {
    const orden: OrdenData = await findOrdenById(id);
    
    //Corroborar que el origen ID le corresponde al usuario logueado
    if (orden.usuarioId != req.user.id) {
      throw new ForbiddenError("El usuario logueado no tiene permisos para acceder a la orden");
    }

  }

}