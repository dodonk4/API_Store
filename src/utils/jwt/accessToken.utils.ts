import jwt from 'jsonwebtoken';
import type { UserData } from '../../interfaces/User.interface.ts';

export default function generateAccessToken(user: UserData): string {
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
