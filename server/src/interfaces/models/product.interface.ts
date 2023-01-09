import Document from "mongoose";

export interface IProductModel extends Document {
	_id: string;
	list_id: string;
	name: string;
	price: number;
	__v: number;
	save: () => Promise<void>;
}
export interface INewProduct {
	_id: string;
	list_id: string;
	name: string;
	price: number;
	__v: number;
}