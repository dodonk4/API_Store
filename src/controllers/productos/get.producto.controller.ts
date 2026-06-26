import express from 'express';
import type { ProductoData } from '../../interfaces/Producto.interface.ts';
import { findAllProductos, findProductoById } from '../../services/productos.service.ts';

async function getProducts(req: express.Request, res: express.Response): Promise<void> {

    const productos: ProductoData[] = await findAllProductos();
    res.json(productos || []);

};

async function getProductById(req: express.Request, res: express.Response): Promise<void> {
    const id: number = parseInt(req.params.productoId as string);

    const producto: ProductoData = await findProductoById(id);
    res.json(producto);

}

export { getProducts, getProductById };


