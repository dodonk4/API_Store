import { z } from 'zod';

export const ordenesSchema = z.object({
    usuarioId: z.number().optional(),
    estado: z.enum(["CARRITO", "PAGO_PENDIENTE", "PAGADA", "CANCELADA"]).optional(),
    fecha: z.date().optional(),
}).strict();;

export type ordenBody = z.infer<typeof ordenesSchema>