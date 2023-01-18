import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import useVerifyToken from "../composables/useVerifyToken";

export async function validateToken (req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.cookies.token;
		if (!token || token == undefined) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		let user = await useVerifyToken(token);
        if(typeof user == "string" || !user.id || !Types.ObjectId.isValid(user.id.toString())) {
			return res.status(401).json({ message: "Unauthorized" });
        }
		req.body.user_id = user.id;
		next();
	} catch (err) {
		console.log(err);
		return res.status(401).json({ message: "Unauthorized" });
	}
}
