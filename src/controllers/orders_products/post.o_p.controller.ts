import express from 'express';
import type { Order_ProductData } from '../../interfaces/Order_Product.interface.ts';
import type { OrderData } from '../../interfaces/Order.interface.ts';
import type { ProductData } from '../../interfaces/Product.interface.ts';
import { createOrderProduct } from '../../services/orders_products.service.ts';
import { checkOrderOwner } from '../../utils/checkOrderOwner.utils.ts';
import { findProductById, updateProduct } from '../../services/products.service.ts';
import { Decimal } from '@prisma/client/runtime/client';
import { findOrderById } from '../../services/orders.service.ts';
import { ConflictError } from '../../errors/ConflictError.ts';
import { NotFoundError } from '../../errors/NotFoundError.ts';

type PostOrderProductBody = {
    productId: number,
    quantity: number
}

export default async function postOrderProduct(req: express.Request, res: express.Response): Promise<void> {

    const orderId: number = parseInt(req.params.orderId as string);
    const { productId, quantity }: PostOrderProductBody = req.body;

    //Corrobora que el usuario tenga permisos para modificar este o_p
    //Si es de él, puede. Sino, tiene que ser un ADMIN
    await checkOrderOwner(orderId, req);
    const order: OrderData = await findOrderById(orderId);
    if (req.user?.rol === "USER") {
      if (order.state != "CART") {
        throw new ConflictError("No se puede modificar o eliminar un producto de una orden que ya no esté en carrito");
      }
    }

    const product: ProductData = await findProductById(productId);

    if (!product || !product.id) {
      throw new NotFoundError("No se encuentra el producto que se quiere agregar a la orden");
    }

    if(product.stock < quantity){
      throw new ConflictError("La cantidad pedida es mayor al stock del producto");
    }

    await updateProduct(product.id, { stock: (product.stock - quantity) })

    const unitPrice: Decimal = product.price;


    const resultOrderProduct: Order_ProductData = await createOrderProduct({ orderId, productId, unitPrice, quantity });
    res.send(resultOrderProduct);

}