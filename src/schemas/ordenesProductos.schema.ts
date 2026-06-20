import { z } from 'zod';

export const ordenesProductosSchema = z.object({
    ordenId: z.number(),
    productId: z.number(),
    // precioUnitario: z.date().optional(),
    cantidad: z.number()
});

export type ordenProductoBody = z.infer<typeof ordenesProductosSchema>