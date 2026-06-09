import express from 'express';
import * as ProductoData from "../interfaces/Producto.interface.ts";
import { prisma } from "../lib/prisma.ts";

export async function checkExistingProducts(productos: any[], res: express.Response, productPrices: number[]){
    productos.forEach(async (product) => {
      let productToInsert: ProductoData.default | null = await prisma.productos.findUnique({ where: { id: product.id} });

      if(!productToInsert){
        return res.status(400).json({ error: `El producto con id ${product.id} que se desea insertar en la orden no existe` });
      }

      productPrices.push(productToInsert.precio);

      productToInsert = null;

    });
}