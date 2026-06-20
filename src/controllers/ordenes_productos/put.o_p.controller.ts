import express from 'express';
import { updateOrdenById } from '../../services/ordenes.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';

export default async function updateOrdenProductoController(req: any, res: express.Response, next: express.NextFunction) {
    try {

        const id = parseInt(req.params.ordenId as string);

        await checkOrdenOwner(id, req);
        //Hay que chequear que el orden_producto no pertenezca a una orden completada o activa para cambiarla

        const { cantidad, ordenId, precioUnitario, productId } = req.body; //el campo "ordenes_productos" no se tiene que pasar por aquí
        if (!cantidad && !ordenId && !precioUnitario && !productId) {
            return res.status(400).json({ error: 'Al menos uno de los campos (cantidad, ordenId, precioUnitario, productId) es requerido' });
        }

        if(req.user.rol === "USER"){
            if(precioUnitario){
                throw new Error("No tienes permisos para modificar el precio unitario del producto pedido en la orden");
            }
        }

        await updateOrdenById(id, req.body);

        res.status(200).send("Orden correctamente actualizada");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
}
