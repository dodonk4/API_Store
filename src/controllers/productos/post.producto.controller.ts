import express from 'express';
import Producto from '../../models/Producto.model.ts';
import * as ProductoData from '../../interfaces/Producto.interface.ts';
import { Prisma } from '../../../generated/prisma/client.ts';


function postProducto(req: express.Request, res: express.Response): express.Response | undefined {
  const { nombre, descripcion, precio, stock } = req.body;
  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Nombre, precio y stock son requeridos' });
  }
  Producto.create(req.body, (err : Error | null, producto : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(producto);
  });
}

function postBulk(req: express.Request, res: express.Response): void{
  const productos: ProductoData.default[] = req.body;
    productos.forEach(e => {
        if (!e.nombre || e.precio === undefined || e.stock === undefined) {
        return res.status(400).json({ error: 'Nombre, precio y stock son requeridos' });
    }
  });
  
  Producto.createMany(req.body, (err : Error | null, productos?: Prisma.BatchPayload) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(productos);
  });
}

export { postProducto, postBulk }