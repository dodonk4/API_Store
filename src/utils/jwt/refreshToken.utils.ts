import jwt from 'jsonwebtoken';
import type { UsuarioData } from '../../interfaces/Usuario.interface.ts';

export default function generateRefreshToken(user: UsuarioData): string {
    return jwt.sign({
        id: user.id
    },
        process.env.AUTH_REFRESH_SECRET as string,
        {
            expiresIn: "24h"
        })
}
