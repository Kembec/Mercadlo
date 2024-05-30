import { Request, Response } from "express";

export function handle404(req: Request, res: Response): void {
	res.status(404).send({ message: "Route not found" });
}
