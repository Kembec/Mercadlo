import { Request, Response } from "express";
import { Product } from "../models/product.model";

export class ProductController {
	// Get all products
	public static async getAll(req: Request, res: Response) {
		try {
			const products = await Product.find({ list_id: req.params.list_id });
			res.status(200).json(products);
		} catch (err) {
			res.status(500).json({ message: "Error getting the products" });
		}
	}

	// Get a product by ID
	public static async getById(req: Request, res: Response) {
		try {
			const product = await Product.findById(req.params.id);
			if(!product) {
				return res.status(404).json({ message: "Product not found" });
			}
			res.status(200).json(product);
		} catch (err: any) {
			res.status(500).json({ message: "Error getting the product" });
		}
	}

	// Add a new product
	public static async add(req: Request, res: Response) {
		try {
			const newProduct = new Product({
				name: req.body.name,
				price: req.body.price,
				list_id: req.params.list_id,
			});
			const savedProduct = await newProduct.save();
			res.status(201).json(savedProduct);
		} catch (err) {
			res.status(422).json({ message: "Invalid product" });
		}
	}

	// Update a product
	public static async update(req: Request, res: Response) {
		try {
			const updatedProduct = await Product.findByIdAndUpdate(
				req.params.id,
				{
					name: req.body.name,
					price: req.body.price,
				},
				{ new: true, runValidators: true }
			);
			if (!updatedProduct) {
				return res.status(404).json({ message: 'Product not found' });
			}
			res.status(200).json(updatedProduct);
		} catch (err) {
			res.status(422).json({ message: "Invalid product" });
		}
	}

	// Delete a product
	public static async delete(req: Request, res: Response) {
		try {
			const product = await Product.findByIdAndDelete(req.params.id);
			if(!product) {
				return res.status(404).json({ message: "Product not found" });
			}
			res.status(200).json({ message: "Product deleted" });
		} catch (err) {
			res.status(500).json({ message: "Error deleting the product" });
		}
	}
}
