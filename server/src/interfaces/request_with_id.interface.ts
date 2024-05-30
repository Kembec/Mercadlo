import { Request } from "express";

export interface RequestWithId extends Request {
	body: {
		user_id: string;
	};
}
