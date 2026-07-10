import jwt from 'jsonwebtoken';
import type { UsuarioData } from '../../interfaces/Usuario.interface.ts';

export default function generateAccessToken(user: UsuarioData): string {
    return jwt.sign({
        id: user.id,
        username: user.username,
        rol: user.rol,
    },
        process.env.AUTH_SECRET as string,
        {
            expiresIn: "15m"
        })
}
