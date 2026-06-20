import { Decimal } from "@prisma/client/runtime/client";

export default interface Orden_ProductoData{
    id?: number,
    ordenId: number,
    productId: number,
    precioUnitario: Decimal,
    cantidad: number,
}