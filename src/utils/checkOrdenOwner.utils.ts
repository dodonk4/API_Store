import { findOrdenById } from '../services/ordenes.service.ts';
import type { OrdenData } from '../interfaces/Orden.interface.ts';
import * as AuthRequest from '../interfaces/AuthRequest.ts';

export async function checkOrdenOwner(id: number, req: AuthRequest.default): Promise<void | Error> {
  if (!req.user) {
    throw new Error("Tiene que haber un usuario logueado");
  }

  if (req.user.rol != "ADMIN") {
    const orden: OrdenData = await findOrdenById(id);

    //Corroborar que el origen ID le corresponde al usuario logueado
    if (orden.usuarioId != req.user.id) {
      throw new Error("El usuario logueado no tiene permisos para acceder a la orden");
    }

  }

}