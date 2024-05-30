import { RequestWithId } from "@interfaces/request_with_id.interface";
import { NextFunction, Response } from "express";

import useVerifyToken from "../composables/useVerifyToken";

export function validateToken(req: RequestWithId, res: Response, next: NextFunction): void | Response {
	try {
		const token = req.cookies.token as string;
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const user = useVerifyToken(token);
		if (typeof user === "string" || !user.id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		req.body.user_id = user.id as string;

		next();
	} catch (err) {
		return res.status(401).json({ message: "Unauthorized" });
	}
}
