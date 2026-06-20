import express from 'express';
import { deleteOrdenProducto } from '../../services/ordenes_productos.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import { checkOrdenProductoOwner } from '../../utils/checkOrdenProductoOwner.utils.ts';


export default async function deleteOrdenProductoController(req: express.Request, res: express.Response): Promise<void | Error> {
  try {

    const ordenId = parseInt(req.params.ordenId as string);
    const ordenProductoId = parseInt(req.params.ordenId as string);

    //Corrobora que el usuario tenga permisos para modificar este o_p
    //Si es de él, puede. Sino, tiene que ser un ADMIN
    await checkOrdenOwner(ordenId, req);
    await checkOrdenProductoOwner(ordenProductoId, ordenId, req);
  
    await deleteOrdenProducto(ordenProductoId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: (error as Error).message });
  }
}