import { NextFunction, Request, Response } from "express";

export const middle = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if(!auth) {
         return res.status(401).json({ message: 'ne avt' })
    }

    next()
}