import express from 'express';
import { ForbiddenError } from '../errors/ForbiddenError.ts';

export function validateRol(allowedRoles: string[]) {
    return (
        req: any,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const userRol = req.user.rol;

        if (allowedRoles.includes(userRol)) {
            return next();
        }

        throw new ForbiddenError("Los permisos del usuario logueado son insuficientes");
    };
}