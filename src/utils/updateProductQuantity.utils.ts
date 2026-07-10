import { ConflictError } from "../errors/ConflictError.ts";
import type { Orden_ProductoData } from "../interfaces/Orden_Producto.interface.ts";
import type { ProductoData } from "../interfaces/Producto.interface.ts";
import { findProductoById, updateProducto } from "../services/productos.service.ts";

export async function updateProductQuantity(ordenProducto: Orden_ProductoData, cantidad: number): Promise<void | Error> {
    const producto: ProductoData = await findProductoById(ordenProducto.productId);
    let diferencia = 0;
    if (ordenProducto.cantidad > cantidad && producto.id) {//Se tiene que corregir el data para hacer obligatorio que haya un id y no hacer esta verificación
        diferencia = ordenProducto.cantidad - cantidad;
        await updateProducto(producto.id, { stock: (producto.stock + diferencia) })
    }
    if (ordenProducto.cantidad < cantidad && producto.id) {//Se tiene que corregir el data para hacer obligatorio que haya un id y no hacer esta verificación
        diferencia = cantidad - ordenProducto.cantidad
        if ((producto.stock - diferencia) < 0) {
            throw new ConflictError("La cantidad pedida es mayor al stock del producto");
        }
        await updateProducto(producto.id, { stock: (producto.stock - diferencia) })
    }

}

