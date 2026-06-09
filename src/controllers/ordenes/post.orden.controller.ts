import express from 'express';
import * as OrdenData from "../../interfaces/Orden.interface.ts";
import { prisma } from "../../lib/prisma.ts";
import * as AuthRequest from '../../interfaces/AuthRequest.ts';
import { checkExistingProducts } from '../../utils/checkExistingProducts.utils.ts';
import { createOrdenesProductos } from '../../utils/createOrdenesProductos.utils.ts';

//IDEAL:  export default async function postOrden(req: AuthRequest.default, res: express.Response): Promise<void | express.Response> {
export default async function postOrden(req: any, res: express.Response): Promise<void | express.Response> {

  try {
    const user: any = JSON.stringify(req.user); //Ver como arreglar este tipado, porque hay conflictos con user.id luego
    const { productos } = req.body;
    const fecha: Date = new Date();
    if (!productos || !Array.isArray(productos)) {
      return res.status(400).json({ error: 'Se requieren productos para subir a la orden' });
    }
    // console.log(req);
    //CORREGIR LO DEL REQ.USER
    const resultOrden: OrdenData.default = await prisma.ordenes.create({ data: { user: user.id, estado: "pending", fecha } });

    if(!resultOrden){
      return res.status(400).json({ error: 'Hubo un error al crear la orden' });
    }

    let productPrices: number[] = [];

    await checkExistingProducts(productos, res, productPrices);

    await createOrdenesProductos(productos, res, resultOrden.id, productPrices);

    res.status(200).json({resultOrden});

  } catch (error: any) {
    console.error(error);
    res.status(error.status).json({})
  }

}
