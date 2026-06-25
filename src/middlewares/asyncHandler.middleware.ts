import express from 'express';

//Explicación, porque es bastante agresiva esta sintaxis:
//AsyncHandler recibe como parametro una función. Que, generalmente, será un controlador
// (Si fuera otra función, funcionaría, pero no tiene sentido, porque luego se le asignan parametros de "req, res, next")
//Lo que devuelve asyncHandler es una función (req, res, next)
//Y esta misma, devuelve una Promesa que se resuelve o se rechaza
//Y, dentro del resolve, se le pasa como parametros "req, res, next".
//Se hace el .catch(next) para llamar al errorHandler en caso de error

export const asyncHandler =
    (fn: Function) =>
        (req: express.Request, res: express.Response, next: express.NextFunction) =>
            Promise.resolve(fn(req, res, next)).catch(next);