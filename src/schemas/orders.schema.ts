import { z } from 'zod';

export const ordersSchema = z.object({
    userId: z.number().optional(),
    state: z.enum(["CART", "PENDING_PAYMENT", "PAID", "CANCELED"]).optional(),
    date: z.date().optional(),
}).strict();;

export type orderBody = z.infer<typeof ordersSchema>