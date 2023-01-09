import Document from "mongoose";
import { IProductModel } from "./product.interface";

export interface IListModel extends Document {
	_id: string;
	user_id: string;
	name: string;
	items: IProductModel[];
	__v: number;
	save: () => Promise<void>;
}
export interface INewList {
	_id: string;
	name: string;
	user_id: string;
	items: Array<{name: string, price: Number}>;
	__v: number;
}
