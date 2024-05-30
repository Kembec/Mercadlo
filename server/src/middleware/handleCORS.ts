import cors from "cors";
import { NextFunction, Request, Response } from "express";

export function handleCORS(req: Request, res: Response, next: NextFunction): void {
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})(req, res, next);
}
