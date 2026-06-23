import express from 'express';

export default interface AuthRequest extends express.Request{
    user: {
        id: number,
        username: string,
        rol: "USER" | "ADMIN",

    }
}