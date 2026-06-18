import express from 'express';
import { findOrdenProductoById } from '../../services/ordenes_productos.service.ts';
import * as Orden_ProductoData from '../../interfaces/Orden_Producto.interface.ts';

// o_p = orden_producto

export default async function getOrdenProductoById(req: express.Request, res: express.Response): Promise<void> {
    const id = parseInt(req.params.ordenProductoId as string);
    try {
        const ordenProducto: Orden_ProductoData.default = await findOrdenProductoById(id);
        res.json(ordenProducto);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
}