import express from 'express';
import deleteOrden from '../controllers/ordenes/delete.orden.controller.ts';
import {getAllOrdenes, getOrdenById} from '../controllers/ordenes/get.orden.controller.ts';
import postOrden from '../controllers/ordenes/post.orden.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.middleware.ts';
import { validateRol } from '../middlewares/validateRol.middleware.ts';
import updateOrden from '../controllers/ordenes/put.orden.controller.ts';



const router = express.Router();

router.get('/', validateAccessToken, validateRol(["ADMIN"]), getAllOrdenes);

router.post('/', validateAccessToken, validateRol(["ADMIN"]), postOrden);

//Hay que arreglar esto para que agarre las ordenes del user, no una orden que no le corresponde
router.get('/:ordenId', validateAccessToken, validateRol(["USER", "ADMIN"]), getOrdenById);

router.put('/:ordenId', validateAccessToken, validateRol(["USER", "ADMIN"]), updateOrden); //ACTUALIZAR LAS PARTICULARIDADES DE LA ORDEN, NO SUS PRODUCTOS

router.delete('/:ordenId', validateAccessToken, validateRol(["USER", "ADMIN"]), deleteOrden);

// router.put('/:ordenId/products'); //PISAR LOS PRODUCTOS QUE YA ESTÁN Y AGREGAR NUEVOS

// router.delete('/:ordenId/products/:productId'); //ELIMINAR UN PRODUCTO EN LA ORDEN

// router.create('/:ordenId/products'); //AGREGAR UN PRODUCTO EN LA ORDEN



router.delete('/:ordenId', deleteOrden);

export default router;