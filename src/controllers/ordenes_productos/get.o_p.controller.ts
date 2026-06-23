import express from 'express';
import { findAllOrdenesProductosByOrdenId, findOrdenProductoById } from '../../services/ordenes_productos.service.ts';
import type { Orden_ProductoData } from '../../interfaces/Orden_Producto.interface.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import { checkOrdenProductoOwner } from '../../utils/checkOrdenProductoOwner.utils.ts';

export async function getOrdenProductoById(req: express.Request, res: express.Response): Promise<void> {
    try {
        const ordenId: number = parseInt(req.params.ordenId as string);
        const ordenProductoId: number = parseInt(req.params.ordenProductoId as string);

        //Corrobora que el usuario tenga permisos para modificar este o_p
        //Si es de él, puede. Sino, tiene que ser un ADMIN
        await checkOrdenOwner(ordenId, req);
        await checkOrdenProductoOwner(ordenProductoId, ordenId, req);

        const ordenProducto: Orden_ProductoData = await findOrdenProductoById(ordenProductoId);
        res.json(ordenProducto);
    } catch (error: any) {
        console.error(error);
        res.status(500).send({ error: (error as Error).message });
    }
}

export async function getAllOrdenProductoByOrdenId(req: express.Request, res: express.Response): Promise<void> {
    try {
        const ordenId: number = parseInt(req.params.ordenId as string);

        //Corrobora que el usuario tenga permisos para modificar este o_p
        //Si es de él, puede. Sino, tiene que ser un ADMIN
        await checkOrdenOwner(ordenId, req);

        const ordenesProductos: Orden_ProductoData[] = await findAllOrdenesProductosByOrdenId(ordenId);

        res.json(ordenesProductos);
    } catch (error: any) {
        console.error(error);
        res.status(500).send({ error: (error as Error).message });
    }
}