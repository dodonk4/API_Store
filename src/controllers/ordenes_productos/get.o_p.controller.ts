import express from 'express';
import { findAllOrdenesProductosByOrdenId, findOrdenProductoById } from '../../services/ordenes_productos.service.ts';
import * as Orden_ProductoData from '../../interfaces/Orden_Producto.interface.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import { checkOrdenProductoOwner } from '../../utils/checkOrdenProductoOwner.utils.ts';

// o_p = orden_producto

export async function getOrdenProductoById(req: express.Request, res: express.Response): Promise<void> {
    try {
        const ordenId = parseInt(req.params.ordenId as string);
        const ordenProductoId = parseInt(req.params.ordenProductoId as string);

        //Corrobora que el usuario tenga permisos para modificar este o_p
        //Si es de él, puede. Sino, tiene que ser un ADMIN
        await checkOrdenOwner(ordenId, req);
        await checkOrdenProductoOwner(ordenProductoId, ordenId, req);

        const ordenProducto: Orden_ProductoData.default = await findOrdenProductoById(ordenProductoId);
        res.json(ordenProducto);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: (error as Error).message });
    }
}

export async function getAllOrdenProductoByOrdenId(req: express.Request, res: express.Response): Promise<void>{
    try {
        const ordenId = parseInt(req.params.ordenId as string);
        
        //Corrobora que el usuario tenga permisos para modificar este o_p
        //Si es de él, puede. Sino, tiene que ser un ADMIN
        await checkOrdenOwner(ordenId, req);

        const ordenesProductos = await findAllOrdenesProductosByOrdenId(ordenId);

        res.json(ordenesProductos);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: (error as Error).message });
    }
}