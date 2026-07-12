import express from 'express';
import { findAllOrdersProductsByOrderId, findOrderProductById } from '../../services/orders_products.service.ts';
import type { Order_ProductData } from '../../interfaces/Order_Product.interface.ts';
import { checkOrderOwner } from '../../utils/checkOrderOwner.utils.ts';
import { checkOrderProductOwner } from '../../utils/checkOrderProductOwner.utils.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

export async function getOrderProductById(req: express.Request, res: express.Response): Promise<void> {

    const orderId: number = parseInt(req.params.orderId as string);
    const orderProductId: number = parseInt(req.params.orderProductId as string);

    if (!Number.isInteger(orderId)) {
        throw new BadRequestError("El orderId debe ser un numero");
    }

    if (!Number.isInteger(orderProductId)) {
        throw new BadRequestError("El orderProductId debe ser un numero");
    }

    //Corrobora que el usuario tenga permisos para modificar este o_p
    //Si es de él, puede. Sino, tiene que ser un ADMIN
    await checkOrderOwner(orderId, req);
    await checkOrderProductOwner(orderProductId, orderId, req);

    const orderProduct: Order_ProductData = await findOrderProductById(orderProductId);
    res.json(orderProduct);

}

export async function getAllOrderProductByOrderId(req: express.Request, res: express.Response): Promise<void> {
    const orderId: number = parseInt(req.params.orderId as string);

    //Corrobora que el usuario tenga permisos para modificar este o_p
    //Si es de él, puede. Sino, tiene que ser un ADMIN
    await checkOrderOwner(orderId, req);

    const ordersProducts: Order_ProductData[] = await findAllOrdersProductsByOrderId(orderId);

    res.json(ordersProducts);

}