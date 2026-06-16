import jwt from 'jsonwebtoken';
import * as UsuarioData from '../../interfaces/Usuario.interface.ts';

export default function generateRefreshToken(user: UsuarioData.default): string {
    return jwt.sign({
        id: user.id
    },
        process.env.AUTH_REFRESH_SECRET as string,
        {
            expiresIn: "15m"
        })
}
