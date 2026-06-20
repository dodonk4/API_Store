import express from 'express';
import deleteOrden from '../controllers/ordenes/delete.orden.controller.ts';
import {getAllOrdenes, getOrdenById} from '../controllers/ordenes/get.orden.controller.ts';
import postOrden from '../controllers/ordenes/post.orden.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.middleware.ts';
import { validateRol } from '../middlewares/validateRol.middleware.ts';
import updateOrden from '../controllers/ordenes/put.orden.controller.ts';
import { getAllOrdenProductoByOrdenId, getOrdenProductoById } from '../controllers/ordenes_productos/get.o_p.controller.ts';
import { validateSchema } from '../middlewares/validateSchema.middleware.ts';
import { ordenesSchema } from '../schemas/ordenes.schema.ts';
import updateOrdenProductoController from '../controllers/ordenes_productos/put.o_p.controller.ts';
import deleteOrdenProductoController from '../controllers/ordenes_productos/delete.o_p.controller.ts';
import postOrdenProducto from '../controllers/ordenes_productos/post.o_p.controller.ts';



const router = express.Router();

//Ordenes

router.get('/', validateAccessToken, validateRol(["ADMIN"]), getAllOrdenes);

router.post('/', validateAccessToken, validateRol(["USER", "ADMIN"]), validateSchema(ordenesSchema), postOrden);

//Hay que arreglar esto para que agarre las ordenes del user, no una orden que no le corresponde
router.get('/:ordenId', validateAccessToken, validateRol(["USER", "ADMIN"]), getOrdenById);

router.put('/:ordenId', validateAccessToken, validateRol(["USER", "ADMIN"]), validateSchema(ordenesSchema), updateOrden); //ACTUALIZAR LAS PARTICULARIDADES DE LA ORDEN, NO SUS PRODUCTOS

router.delete('/:ordenId', validateAccessToken, validateRol(["USER", "ADMIN"]), deleteOrden);

//Ordenes_productos

//||  //Esto se es más fácil de comprender con lo siguiente:
//||  //'/2/products/4'
//||  //No se busca obtener el producto de id 4 en la orden 2
//V  //Se busca obtener el producto ordenado que se registró con id 4 y que corresponde a la orden 2
router.get('/:ordenId/products/:ordenProductoId', validateAccessToken, validateRol(["USER", "ADMIN"]), getOrdenProductoById);

router.get('/:ordenId/products', validateAccessToken, validateRol(["USER", "ADMIN"]), getAllOrdenProductoByOrdenId);

router.put('/:ordenId/products/:ordenProductoId', validateAccessToken, validateRol(["USER", "ADMIN"]), updateOrdenProductoController);

router.delete('/:ordenId/products/:ordenProductoId', validateAccessToken, validateRol(["USER", "ADMIN"]), deleteOrdenProductoController);

router.post('/:ordenId/products', validateAccessToken, validateRol(["USER", "ADMIN"]), postOrdenProducto);


export default router;