import mongoose, { Model } from "mongoose";
import { IUserModel } from "../interfaces/models/user.interface";


const UserModel = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export const User: Model<IUserModel> = mongoose.model<IUserModel>("User", UserModel);
