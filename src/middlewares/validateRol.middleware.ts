import express from 'express';

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

        return res.status(403).json({
            message: 'Los permisos del usuario logueado son insuficientes'
        });
    };
}