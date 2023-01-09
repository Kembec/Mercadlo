import mongoose, { Model } from "mongoose";
import { IProductModel } from "../interfaces/models/product.interface";


const ProductModel = new mongoose.Schema({
	list_id: { 
		ref: "List",
		required: true,
		type: mongoose.Schema.Types.ObjectId,
	},
	name: { type: String, required: true },
	price: { type: Number, required: true },
});

export const Product: Model<IProductModel> = mongoose.model<IProductModel>("Product", ProductModel);
