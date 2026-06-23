import express from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma.ts';
import { createUsuario } from '../../services/usuarios.service.ts';
import type { CreateUsuarioData, UsuarioData } from '../../interfaces/Usuario.interface.ts';

type RegisterBody = {
    email: string,
    username: string,
    password: string,
    password_confirmation: string
}

export async function register(req: express.Request, res: express.Response) {

    try {
        const { email, username, password, password_confirmation }: RegisterBody = req.body;

        if(password != password_confirmation){
            throw new Error("La confirmación de la contraseña no coincide");
        }

        const user: UsuarioData | null = await prisma.usuarios.findUnique({ where: { email: email } })

        if (user) {
            throw new Error("El email no está disponible");
        }

        //Hashear el password antes de guardarlo
        const saltRounds: number = 12;
        const hashedPassword: string = await bcrypt.hash(password, saltRounds);
        const data: CreateUsuarioData = {
            nombre: username,
            email,
            password: hashedPassword,
            refreshToken: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const usuario: UsuarioData = await createUsuario(data);
        res.status(201).json(usuario);

    } catch (error: any) {
        console.log(error);
        res.json({ error: error.message });
    }

}