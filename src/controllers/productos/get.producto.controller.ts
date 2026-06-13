import express from 'express';
import * as ProductoData from '../../interfaces/Producto.interface.ts';
import { findAllProductos, findProductoById } from '../../services/productos.service.ts';

async function getProducts(req: express.Request, res: express.Response): Promise<void> {
    try {
        const productos: ProductoData.default[] = await findAllProductos();
        res.json(productos || []);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
};

async function getProductById(req: express.Request, res: express.Response): Promise<void> {
    const id = parseInt(req.params.productoId as string);
    try {
        const producto: ProductoData.default = await findProductoById(id);
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
}

export { getProducts, getProductById };


