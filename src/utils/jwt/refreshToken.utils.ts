import jwt from 'jsonwebtoken';
import type { UserData } from '../../interfaces/User.interface.ts';

export default function generateRefreshToken(user: UserData): string {
    return jwt.sign({
        id: user.id
    },
        process.env.AUTH_REFRESH_SECRET as string,
        {
            expiresIn: "24h"
        })
}
