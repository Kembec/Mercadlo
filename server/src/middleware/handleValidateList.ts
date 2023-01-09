import { List } from "../models/list.model";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export async function validateList(req: Request, res: Response, next: NextFunction) {
	try {
        if(!req.params.list_id) {
            return next();
        }
        if(!Types.ObjectId.isValid(req.params.list_id.toString())) {
			return res.status(404).json({ message: "The list is invalid" });
        }
        const list = await List.find({ user_id: req.body.user_id, _id: req.params.list_id });
        if(!list || list.length === 0) {
			return res.status(404).json({ message: "List not found" });
        }
		next();
	} catch (err) {
		console.log(err);
		return res.status(401).json({ message: "Unauthorized" });
	}
}
