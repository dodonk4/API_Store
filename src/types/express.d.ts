import { UsuarioData } from "../interfaces/UsuarioData";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number,
                email: string,
                rol: "USER" | "ADMIN",
            }
        }
    }
}

export { };