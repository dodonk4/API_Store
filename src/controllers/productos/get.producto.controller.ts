import express from 'express';
import Producto from '../../models/Producto.model.ts';

function getProducts(req: express.Request, res: express.Response): void {
    Producto.findAll((err: Error | null, productos: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(productos || []);
    });
};

function getProductById(req: express.Request, res: express.Response): void {
    const id = parseInt(req.params.productoId as string);
    Producto.findById(id, (err: Error | null, producto: any) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    });
}

export { getProducts, getProductById };


