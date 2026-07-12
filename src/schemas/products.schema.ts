import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().max(30, "El nombre del producto no puede tener más de 30 caracteres"),
    description: z.string().max(200, "La descripción del producto no puede tener más de 200 caracteres").optional(),
    category: z.string(),
    stock: z.number().nonnegative("El stock no puede ser negativo"),  
    price: z.number().nonnegative("El precio no puede ser negativo").multipleOf(0.01, "El precio debe tener como máximo dos decimales"),
})

export const productSchemaUpdate = productSchema.partial();

export type productBody = z.infer<typeof productSchema>
export type productUpdateBody = z.infer<typeof productSchemaUpdate>