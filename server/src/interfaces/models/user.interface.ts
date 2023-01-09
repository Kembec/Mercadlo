import Document from "mongoose";

export interface IUserModel extends Document {
	__v: number;
	_id: string;
	email: string;
	name: string;
	password: string;
	save: () => Promise<void>;
}

export interface INewUser {
	_id?: string;
	email: string;
	name: string;
	password: string;
}