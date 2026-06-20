import jwt from 'jsonwebtoken';
import * as UsuarioData from '../../interfaces/Usuario.interface.ts';

export default function generateAccessToken(user: UsuarioData.default): string {
    return jwt.sign({
        id: user.id,
        username: user.nombre,
        rol: user.rol,
    },
        process.env.AUTH_SECRET as string,
        {
            expiresIn: "15m"
        })
}
