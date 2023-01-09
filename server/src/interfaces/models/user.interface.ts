import Document from "mongoose";

export interface IUserModel extends Document {
	_id: string;
	name: string;
	email: string;
	password: string;
	__v: number;
	save: () => Promise<void>;
}

export interface INewUser {
	_id?: string;
	name: string;
	email: string;
	password: string;
}