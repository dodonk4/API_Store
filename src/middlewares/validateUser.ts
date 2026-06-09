import express from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../interfaces/AuthRequest';

export function validateUser(req: AuthRequest, res: express.Response, next: express.NextFunction){
    try {
        console.log(req.user);
        const validation = 
    } catch (error: any) {
        console.log(error);
        res.status(error.status).json({error});
    }
}