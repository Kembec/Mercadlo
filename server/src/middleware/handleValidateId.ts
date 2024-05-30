import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export function validateId(req: Request, res: Response, next: NextFunction): void {
	try {
		if (!req.params.id) {
			next();

			return;
		}
		if (!Types.ObjectId.isValid(req.params.id.toString())) {
			res.status(404).json({ message: "The id is invalid" });

			return;
		}
		next();
	} catch (err) {
		console.error(err);

		res.status(401).json({ message: "Unauthorized" });

		return;
	}
}
