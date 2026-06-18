import express from 'express';
import * as OrdenData from "../../interfaces/Orden.interface.ts";
import { createOrden } from '../../services/ordenes.service.ts';
import { checkExistingProducts } from '../../utils/checkExistingProducts.utils.ts';
import { createOrdenesProductos } from '../../utils/createOrdenesProductos.utils.ts';

//IDEAL:  export default async function postOrden(req: AuthRequest.default, res: express.Response): Promise<void | express.Response> {
export default async function postOrden(req: any, res: express.Response): Promise<void | express.Response> {

  try {
    const { id } = req.body;
    // const user: any = jwt.verify(req.cookies.access_token, process.env.AUTH_SECRET as string);

    const fecha: Date = new Date();
    if (req.user.rol === 'USER') {
      if (id != req.user.id) {
        throw new Error("No tienes los permisos para crear una orden para otro usuario que no sea el logueado");
      }
    }//El otro usuario es ADMIN, así que no se aclara

    const resultOrden: OrdenData.default = await createOrden({ usuarioId: id as number, estado: "PENDING", fecha } as OrdenData.default);

    // let productPrices: number[] = [];

    // await checkExistingProducts(productos, res, productPrices);

    // await createOrdenesProductos(productos, res, resultOrden.id, productPrices);

    res.status(200).json({ resultOrden });

  } catch (error: any) {
    console.error(error);
    res.status(error.status as number).json({})
  }

}
