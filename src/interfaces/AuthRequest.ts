import express from 'express';
import jwt from 'jsonwebtoken';

export default interface AuthRequest extends express.Request{
    user: string | jwt.JwtPayload,
}