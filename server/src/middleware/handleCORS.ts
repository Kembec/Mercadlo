import { Request, Response, NextFunction } from "express";
import cors from 'cors';

export function handleCORS(req: Request, res: Response, next: NextFunction) {
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })(req, res, next);
}
