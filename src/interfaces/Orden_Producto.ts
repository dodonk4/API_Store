export default interface Orden_ProductoData{
    id?: number,
    ordenId: number,
    productId: number,
    precioUnitario: number | null,
    estado: string | null,
    fecha: Date | null,
}