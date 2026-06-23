import { Decimal } from "@prisma/client/runtime/client";

interface IOrden_ProductoData{
    id?: number,
    ordenId: number,
    productId: number,
    precioUnitario: Decimal,
    cantidad: number,
}

export type Orden_ProductoData = IOrden_ProductoData;