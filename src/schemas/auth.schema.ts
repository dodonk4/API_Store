import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

export const registerSchema = z.object({
    email: z.email(),
    username: z.string().max(20).regex(/^[a-zA-Z0-9]*$/, {
        message: "El nombre del usuario no puede tener caracteres especiales"
    }),
    password: z.string().min(8, "La contraseña debe contener minimamente 8 caracteres"),
    password_confirmation: z.string().min(8),
    //No hago la verificación acá de si es igual la confirmación a la contraseña, porque ya lo hago en el controlador.
});

export const createUserSchema = registerSchema.omit({password_confirmation: true});

export const updateUserSchema = createUserSchema.partial();

export type LoginBody = z.infer<typeof loginSchema>;
export type updateUserBody = z.infer<typeof updateUserSchema>;