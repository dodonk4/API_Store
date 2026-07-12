import express from 'express';
import { findOrderById, updateOrderById } from '../../services/orders.service.ts';
import { checkOrderOwner } from '../../utils/checkOrderOwner.utils.ts';
import { Decimal } from '@prisma/client/runtime/client';
import type { OrderData } from '../../interfaces/Order.interface.ts';
import { ConflictError } from '../../errors/ConflictError.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';
import { UnauthorizedError } from '../../errors/UnauthorizedError.ts';
import type { Order_ProductData } from '../../interfaces/Order_Product.interface.ts';
import { findOrderProductById, updateOrderProduct } from '../../services/orders_products.service.ts';
import { updateProductQuantity } from '../../utils/updateProductQuantity.utils.ts';
import type { ProductData } from '../../interfaces/Product.interface.ts';
import { findProductById } from '../../services/products.service.ts';
import { NotFoundError } from '../../errors/NotFoundError.ts';

type PutOrderProductBody = {
    quantity?: number,
    orderId?: number,
    unitPrice?: Decimal,
    productId?: number
}

export default async function updateOrderProductController(req: express.Request, res: express.Response) {

    //El "orderIdParams" indica el ID de la orden a la que pertenece el orden_producto que se desea modificar
    //El orderId (del req.body) indica el ID de la orden a la que se caambiaría el orden_producto
    const orderIdParams: number = parseInt(req.params.orderId as string);
    const orderProductoId: number = parseInt(req.params.orderProductoId as string);

    const { quantity, orderId, unitPrice, productId }: PutOrderProductBody = req.body;
    if (!quantity && !orderId && !unitPrice && !productId) {
        throw new BadRequestError("Al menos uno de los campos (quantity, orderId, unitPrice, productId) es requerido");
    }

    await checkOrderOwner(orderIdParams, req);
    const order: OrderData = await findOrderById(orderIdParams);

    if (req.user?.rol === "USER") {
        if (order.state != "CART") {
            throw new ConflictError("No se puede modificar o eliminar un producto de una orden que ya no esté en carrito");
        }
        if (unitPrice) {
            throw new UnauthorizedError("No tienes permisos para modificar el precio unitario del producto pedido en la orden");
        }
    }


    if (productId) {
        const product: ProductData = await findProductById(productId);
        
        if (!product || !product.id) {
            throw new NotFoundError("No se encuentra el producto que se quiere actualizar en la orden");
        }
    }

    const orderProduct: Order_ProductData = await findOrderProductById(orderProductoId);

    if (quantity) {
        await updateProductQuantity(orderProduct, quantity);
    }

    await updateOrderProduct(orderProductoId, req.body);

    res.status(200).send("Producto de la orden correctamente actualizado");

}
