import express from 'express';
import type { ProductoData } from '../../interfaces/Product.interface.ts';
import { findAllProductos, findProductoById } from '../../services/products.service.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

async function getProducts(req: express.Request, res: express.Response): Promise<void> {

    const productos: ProductoData[] = await findAllProductos();
    res.json(productos || []);

};

async function getProductById(req: express.Request, res: express.Response): Promise<void> {

    
    const id: number = parseInt(req.params.productoId as string);

    if (!Number.isInteger(id)) {
        throw new BadRequestError("El id debe ser un numero");
    }

    const producto: ProductoData = await findProductoById(id);
    res.json(producto);

}

export { getProducts, getProductById };


