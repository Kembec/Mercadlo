import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export function validateId(req: Request, res: Response, next: NextFunction) {
	try {
        if(!req.params.id) {
            return next();
        }
        if(!Types.ObjectId.isValid(req.params.id.toString())) {
			return res.status(404).json({ message: "The id is invalid" });
        }
		next();
	} catch (err) {
		console.log(err);
		return res.status(401).json({ message: "Unauthorized" });
	}
}
