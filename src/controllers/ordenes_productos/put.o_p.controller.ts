import express from 'express';
import { findOrdenById, updateOrdenById } from '../../services/ordenes.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';

//!!! Hay que ver una forma de que esté más limpio

export default async function updateOrdenProductoController(req: any, res: express.Response, next: express.NextFunction) {
    try {

        const ordenIdParams = parseInt(req.params.ordenId as string);//Pongo "params" al final, porque puede venir ordenId del req.body
        const ordenProductoId = parseInt(req.params.ordenId as string);

        //Hay que chequear que el orden_producto no pertenezca a una orden completada o activa para cambiarla

        const { cantidad, ordenId, precioUnitario, productId } = req.body; //el campo "ordenes_productos" no se tiene que pasar por aquí
        if (!cantidad && !ordenId && !precioUnitario && !productId) {
            return res.status(400).json({ error: 'Al menos uno de los campos (cantidad, ordenId, precioUnitario, productId) es requerido' });
        }

        await checkOrdenOwner(ordenIdParams, req);
        const orden = await findOrdenById(ordenIdParams);

        if (req.user.rol === "USER") {
            if (orden.estado != "CARRITO") {
                throw new Error("No se puede modificar o eliminar un producto de una orden que ya no esté en carrito");
            }

            if (precioUnitario) {
                throw new Error("No tienes permisos para modificar el precio unitario del producto pedido en la orden");
            }
        }

        await updateOrdenById(ordenProductoId, req.body);

        res.status(200).send("Producto de la orden correctamente actualizado");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
}
