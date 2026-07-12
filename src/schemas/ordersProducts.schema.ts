import { z } from 'zod';

export const ordersProductsSchema = z.object({
    orderId: z.number(),
    productId: z.number(),
    // precioUnitario: z.date().optional(),
    quantity: z.number()
});

export type ordenProductoBody = z.infer<typeof ordersProductsSchema>