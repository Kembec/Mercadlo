import mongoose, { Model } from "mongoose";
import { IUserModel } from "../interfaces/models/user.interface";


const UserModel = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},
	email: {
		required: true,
		type: String,
		unique: true,
	},
	password: {
		required: true,
		type: String,
	},
});

export const User: Model<IUserModel> = mongoose.model<IUserModel>("User", UserModel);
