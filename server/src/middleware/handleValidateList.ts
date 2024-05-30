import { RequestWithId } from "@interfaces/request_with_id.interface";
import { NextFunction, Response } from "express";
import { Types } from "mongoose";

import { List } from "../models/list.model";

export async function validateList(req: RequestWithId, res: Response, next: NextFunction): Promise<void> {
	try {
		if (!req.params.list_id) {
			next();

			return;
		}
		if (!Types.ObjectId.isValid(req.params.list_id.toString())) {
			res.status(404).json({ message: "The list is invalid" });

			return;
		}
		const list = await List.find({ user_id: req.body.user_id, _id: req.params.list_id });
		if (list.length === 0) {
			res.status(404).json({ message: "List not found" });

			return;
		}
		next();
	} catch (err) {
		console.error(err);

		res.status(401).json({ message: "Unauthorized" });

		return;
	}
}
