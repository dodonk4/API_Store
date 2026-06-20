import express from 'express';
import * as OrdenData from "../../interfaces/Orden.interface.ts";
import { createOrden } from '../../services/ordenes.service.ts';

//IDEAL:  export default async function postOrden(req: AuthRequest.default, res: express.Response): Promise<void | express.Response> {
export default async function postOrden(req: any, res: express.Response): Promise<void | express.Response> {

  try {
    
    let { usuarioId, estado, fecha } = req.body;

    if (req.user.rol === 'USER') {
      //Sino hay un 'usuarioId' en el body, se entiende que se quiere crear una orden para el propio usuario
      if (usuarioId && usuarioId != req.user.id) {
        throw new Error("No tienes los permisos para crear una orden para otro usuario que no sea el logueado");
      }
    }//El otro usuario es ADMIN, así que no se aclara

    //'estado' tiene como defaulta PENDING en la base de datos

    if (!fecha) {
      fecha = new Date();
    }

    //El USER siempre va a llegar acá (porque no tiene permisos para crearle ordenes a otros usuarios).
    //El ADMIN, a veces, porque sí puede crear ordenes a otros.
    if(!usuarioId){
      usuarioId = req.user.id;
    }

    const resultOrden: OrdenData.default = await createOrden({ usuarioId, estado, fecha } as OrdenData.default);

    res.status(200).json({ resultOrden });

  } catch (error: any) {
    console.error(error);
    res.status(error.status as number).json({})
  }

}
