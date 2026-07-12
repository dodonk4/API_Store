import { Decimal } from "@prisma/client/runtime/client";

interface IOrder_ProductData{
    id?: number,
    orderId: number,
    productId: number,
    unitPrice: Decimal,
    quantity: number,
}

export type Order_ProductData = IOrder_ProductData;