import { ConflictError } from "../errors/ConflictError.ts";
import type { Order_ProductData } from "../interfaces/Order_Product.interface.ts";
import type { ProductData } from "../interfaces/Product.interface.ts";
import { findProductById, updateProduct } from "../services/products.service.ts";

export async function updateProductQuantity(orderProduct: Order_ProductData, quantity: number): Promise<void | Error> {
    const product: ProductData = await findProductById(orderProduct.productId);
    let difference = 0;
    if (orderProduct.quantity > quantity && product.id) {//Se tiene que corregir el data para hacer obligatorio que haya un id y no hacer esta verificación
        difference = orderProduct.quantity - quantity;
        await updateProduct(product.id, { stock: (product.stock + difference) });
    }
    if (orderProduct.quantity < quantity && product.id) {//Se tiene que corregir el data para hacer obligatorio que haya un id y no hacer esta verificación
        difference = quantity - orderProduct.quantity
        if ((product.stock - difference) < 0) {
            throw new ConflictError("La cantidad pedida es mayor al stock del product");
        }
        await updateProduct(product.id, { stock: (product.stock - difference) });
    }

}

