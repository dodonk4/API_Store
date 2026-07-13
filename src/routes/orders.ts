import express from 'express';
import deleteOrderController from '../controllers/orders/delete.order.controller.ts'; '../controllers/ordenes/delete.order.controller.ts';
import {getAllOrders, getOrderById} from '../controllers/orders/get.order.controller.ts';
import postOrder from '../controllers/orders/post.order.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.middleware.ts';
import { validateRol } from '../middlewares/validateRol.middleware.ts';
import updateOrder from '../controllers/orders/put.order.controller.ts';
import { getAllOrderProductByOrderId, getOrderProductById } from '../controllers/orders_products/get.o_p.controller.ts';
import { validateSchema } from '../middlewares/validateSchema.middleware.ts';
import { ordersSchema } from '../schemas/orders.schema.ts';
import updateOrderProductController from '../controllers/orders_products/put.o_p.controller.ts';
import deleteOrderProductController from '../controllers/orders_products/delete.o_p.controller.ts';
import postOrderProduct from '../controllers/orders_products/post.o_p.controller.ts';




const router = express.Router();

//Ordenes

router.get('/', validateAccessToken, validateRol(["ADMIN"]), getAllOrders);

router.post('/', validateAccessToken, validateRol(["USER", "ADMIN"]), validateSchema(ordersSchema), postOrder);

router.get('/:orderId', validateAccessToken, validateRol(["USER", "ADMIN"]), getOrderById);

router.put('/:orderId', validateAccessToken, validateRol(["USER", "ADMIN"]), validateSchema(ordersSchema), updateOrder); //ACTUALIZAR LAS PARTICULARIDADES DE LA ORDEN, NO SUS products

router.delete('/:orderId', validateAccessToken, validateRol(["USER", "ADMIN"]), deleteOrderController);

//Ordenes_products

//Esto se es más fácil de comprender con lo siguiente:
//'/2/products/4'
//No se busca obtener el producto de id 4 en la orden 2
//Se busca obtener el producto ordenado que se registró con id 4 y que corresponde a la orden 2
router.get('/:orderId/products/:orderProductId', validateAccessToken, validateRol(["USER", "ADMIN"]), getOrderProductById);

router.get('/:orderId/products', validateAccessToken, validateRol(["USER", "ADMIN"]), getAllOrderProductByOrderId);

router.put('/:orderId/products/:orderProductId', validateAccessToken, validateRol(["USER", "ADMIN"]), updateOrderProductController);

router.delete('/:orderId/products/:orderProductId', validateAccessToken, validateRol(["USER", "ADMIN"]), deleteOrderProductController);

router.post('/:orderId/products', validateAccessToken, validateRol(["USER", "ADMIN"]), postOrderProduct);


export default router;