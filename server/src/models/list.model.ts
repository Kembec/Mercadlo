import mongoose, { Model } from "mongoose";
import { IListModel } from "../interfaces/models/list.interface";

const listSchema = new mongoose.Schema({
	name: { type: String, required: true },
	user_id: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true },
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: false,
		},
	],
});

export const List: Model<IListModel> = mongoose.model<IListModel>("List", listSchema);
