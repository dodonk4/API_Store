import express from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma.ts';
import { createUsuario } from '../../services/usuarios.service.ts';


export async function register(req: express.Request, res: express.Response) {
    //Validar que el cuerpo del body sea valido para registrar un usuario
    try {
        const { email, username, password, password_confirmation } = req.body;

        if (!req.body.username) {
            throw new Error("Se debe ingresar el nombre de usuario");
        }

        if (!req.body.password) {
            throw new Error("Se debe ingresar una contraseña");
        }

        if (!req.body.password_confirmation) {
            throw new Error("La contraseña de confirmación no coincide");
        }

        const user = await prisma.usuarios.findUnique({ where: { email: email } })

        if (user) {
            throw new Error("El email no está disponible");
        }

        //Hashear el password antes de guardarlo
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const data = {
            nombre: username,
            email,
            password: hashedPassword,
            refreshToken: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        //Guardar el usuario con el servicio
        try {
            const usuario = await createUsuario(data as any);
            res.status(201).json(usuario);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    } catch (error: any) {
        console.log(error);
        res.json({error: error.message}); 
    }

}