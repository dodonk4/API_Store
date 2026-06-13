import express from 'express';
import * as OrdenData from "../../interfaces/Orden.interface.ts";
import { createOrden } from '../../services/ordenes.service.ts';
import { checkExistingProducts } from '../../utils/checkExistingProducts.utils.ts';
import { createOrdenesProductos } from '../../utils/createOrdenesProductos.utils.ts';

//IDEAL:  export default async function postOrden(req: AuthRequest.default, res: express.Response): Promise<void | express.Response> {
export default async function postOrden(req: any, res: express.Response): Promise<void | express.Response> {

  try {
    const user: any = req.user; //Ver como arreglar este tipado, porque hay conflictos con user.id luego
    const { productos } = req.body;
    // const user: any = jwt.verify(req.cookies.access_token, process.env.AUTH_SECRET as string);

    const fecha: Date = new Date();
    if (!productos || !Array.isArray(productos)) {
      return res.status(400).json({ error: 'Se requieren productos para subir a la orden' });
    }

    const resultOrden: OrdenData.default = await createOrden({ usuarioId: user.id as number, estado: "pending", fecha } as OrdenData.default);

    let productPrices: number[] = [];

    await checkExistingProducts(productos, res, productPrices);

    await createOrdenesProductos(productos, res, resultOrden.id, productPrices);

    res.status(200).json({resultOrden});

  } catch (error: any) {
    console.error(error);
    res.status(error.status as number).json({})
  }

}
