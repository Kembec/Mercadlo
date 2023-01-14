import mongoose, { Model } from "mongoose";
import { IListModel } from "../interfaces/models/list.interface";

const listSchema = new mongoose.Schema({
	name: { type: String, required: true },
	user_id: { 
		ref: "User",
		type: mongoose.Schema.Types.ObjectId,
	required: true },
	items: [
		{
			ref: "Product",
			required: false,
			type: mongoose.Schema.Types.ObjectId,
		},
	],
});

export const List: Model<IListModel> = mongoose.model<IListModel>("List", listSchema);
