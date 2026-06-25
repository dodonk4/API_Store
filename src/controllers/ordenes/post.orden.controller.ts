import express from 'express';
import type { OrdenData } from '../../interfaces/Orden.interface.ts';
import { createOrden } from '../../services/ordenes.service.ts';
import * as AuthRequest from '../../interfaces/AuthRequest.ts';
//Sí, se puede crear una orden sin aclarar nada
type PostOrdenBody = {
    usuarioId?: number,
    estado?: "CARRITO" | "PAGO_PENDIENTE" | "PAGADA" | "CANCELADA",
    fecha?: Date
}

export default async function postOrden(req: AuthRequest.default, res: express.Response): Promise<void | express.Response> {

  //Si no hay usuarioId, se entiende que se quiere crear una orden para el propio usuario
  //Si hay usuarioId, el usuario debe ser un ADMIN para crear una orden a otro usuario

  try {
    
    let { usuarioId, estado, fecha }: PostOrdenBody = req.body;

    if (req.user.rol === 'USER') {
      if (usuarioId && usuarioId != req.user.id) {
        throw new Error("No tienes los permisos para crear una orden para otro usuario que no sea el logueado");
      }
    }

    //'estado' tiene como default a PENDING en la base de datos

    if (!fecha) {
      fecha = new Date();
    }


    if(!usuarioId){
      usuarioId = req.user.id;
    }

    //El arreglo para el estado hace que sea enviado únicamente cuando no es undefined
    const resultOrden: OrdenData = await createOrden({ usuarioId, ...(estado !== undefined && { estado }), fecha });

    res.status(200).json({ resultOrden });

  } catch (error: any) {
    console.error(error);
    res.status(error.status as number).json({})
  }

}
