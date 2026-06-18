// import express from 'express';
// import { updateOrdenProducto } from '../../services/ordenes_productos.service.ts';
// import { findOrdenById, updateOrdenById } from '../../services/ordenes.service.ts';
// import * as OrdenData from '../../interfaces/Orden.interface.ts';

// export default async function updateOrdenProductoController(req: express.Request, res: express.Response, next: express.NextFunction) {
//     try {

//         if (!req.user) {
//             return new Error("Tiene que haber un usuario logueado para poder actualizar una orden");
//         }

//         const id = parseInt(req.params.ordenId as string);

//         if (req.user.rol != "ADMIN") {
//             const orden: OrdenData.default = await findOrdenById(id);
            
//             //Corroborar que el origen ID le corresponde al usuario logueado
//             if (orden.usuarioId != req.user.id) {
//                 return new Error("El usuario logueado no puede modificar una orden que no le corresponde");
//             }
//         }

//         const { createdAt, estado, fecha, usuarioId } = req.body; //el campo "ordenes_productos" no se tiene que pasar por aquí
//         if (!createdAt && !estado && !fecha && !usuarioId) {
//             return res.status(400).json({ error: 'Al menos uno de los campos (ordenId, productId, precioUnitario, cantidad) es requerido' });
//         }

//         await updateOrdenById(id, req.body);

//         res.status(200).send("Orden correctamente actualizada");
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: (error as Error).message });
//     }
// }
