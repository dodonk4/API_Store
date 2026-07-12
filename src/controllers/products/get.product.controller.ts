import express from 'express';
import type { ProductData } from '../../interfaces/Product.interface.ts';
import { findAllProducts, findProductById } from '../../services/products.service.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

async function getProducts(req: express.Request, res: express.Response): Promise<void> {

    const products: ProductData[] = await findAllProducts();
    res.json(products || []);

};

async function getProductById(req: express.Request, res: express.Response): Promise<void> {

    
    const id: number = parseInt(req.params.productId as string);

    if (!Number.isInteger(id)) {
        throw new BadRequestError("El id debe ser un numero");
    }

    const product: ProductData = await findProductById(id);
    res.json(product);

}

export { getProducts, getProductById };


