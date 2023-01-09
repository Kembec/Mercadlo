import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export function validateToken(req: Request, res: Response, next: NextFunction) {
	try {
		const authorization = req.header("Authorization");
		if (!authorization || authorization == undefined) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		let user = jwt.verify(authorization, process.env.SECRET_KEY!);
        if(typeof user == "string" || !user.id || !Types.ObjectId.isValid(user.id.toString())) {
			return res.status(401).json({ message: "Unauthorized" });
        }
		req.body.user_id = user.id;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Unauthorized" });
	}
}
