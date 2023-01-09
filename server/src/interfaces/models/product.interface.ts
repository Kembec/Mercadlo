import Document from "mongoose";

export interface IProductModel extends Document {
	__v: number;
	_id: string;
	list_id: string;
	name: string;
	price: number;
	save: () => Promise<void>;
}
export interface INewProduct {
	__v: number;
	_id: string;
	list_id: string;
	name: string;
	price: number;
}