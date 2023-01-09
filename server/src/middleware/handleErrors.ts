import { Request, Response, NextFunction } from "express";

export function handleErrors(err: any, req: Request, res: Response, next: NextFunction) {
	console.error(err);
	res.status(500).send({ message: "Error processing the request" });
}
