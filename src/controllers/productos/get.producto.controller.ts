import express from 'express';
import type { ProductoData } from '../../interfaces/Producto.interface.ts';
import { findAllProductos, findProductoById } from '../../services/productos.service.ts';

async function getProducts(req: express.Request, res: express.Response): Promise<void> {
    try {
        const productos: ProductoData[] = await findAllProductos();
        res.json(productos || []);
    } catch (error: any) {
        console.error(error);
        res.send(error);
    }
};

async function getProductById(req: express.Request, res: express.Response): Promise<void> {
    const id: number = parseInt(req.params.productoId as string);
    try {
        const producto: ProductoData = await findProductoById(id);
        res.json(producto);
    } catch (error: any) {
        console.error(error);
        res.send(error);
    }
}

export { getProducts, getProductById };


