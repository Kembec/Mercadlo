import { Request, Response } from "express";

export function handleErrors(err: Error, req: Request, res: Response): void {
	console.error(err);

	res.status(500).send({ message: "Error processing the request" });
}
