import express from 'express';
import jwt from 'jsonwebtoken';
import * as AuthRequest from '../interfaces/AuthRequest.ts';

// export function validateUser(req: AuthRequest.default, res: express.Response, next: express.NextFunction){
//     try {
//         console.log(req.user);
//         const validation = 
//     } catch (error: any) {
//         console.log(error);
//         res.status(error.status).json({error});
//     }
// }