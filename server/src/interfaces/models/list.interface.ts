import Document from "mongoose";
import { IProductModel } from "./product.interface";

export interface IListModel extends Document {
	__v: number;
	_id: string;
	name: string;
	user_id: string;
	save: () => Promise<void>;
}
export interface INewList {
	__v: number;
	_id: string;
	name: string;
	user_id: string;
}
