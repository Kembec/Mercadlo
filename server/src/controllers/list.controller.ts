import { Request, Response } from "express";

import { List } from "../models/list.model";

interface ListRequest extends Request {
	body: {
		user_id: string;
		name: string;
	};
}

export class ListController {
	// Get all lists
	public static async getAll(req: ListRequest, res: Response): Promise<void> {
		try {
			const lists = await List.find({ user_id: req.body.user_id });
			res.status(200).json(lists);
		} catch (err) {
			res.status(500).json({ message: "Error getting the lists" });
		}
	}

	// Get a list by ID
	public static async getById(req: ListRequest, res: Response): Promise<void> {
		try {
			const list = await List.findById(req.params.id);
			if (!list) {
				res.status(404).json({ message: "List not found" });

				return;
			}
			res.status(200).json(list);
		} catch (err) {
			res.status(500).json({ message: "Error getting the list" });
		}
	}

	// Add a new list
	public static async add(req: ListRequest, res: Response): Promise<void> {
		try {
			const newList = new List({
				user_id: req.body.user_id,
				name: req.body.name,
			});
			const savedList = await newList.save();
			res.status(201).json(savedList);
		} catch (err) {
			res.status(422).json({ message: "Invalid list" });
		}
	}

	// Update a list
	public static async update(req: ListRequest, res: Response): Promise<void> {
		try {
			const updatedList = await List.findByIdAndUpdate(
				req.params.id,
				{
					name: req.body.name,
				},
				{ new: true, runValidators: true }
			);
			if (!updatedList) {
				res.status(404).json({ message: "List not found" });

				return;
			}
			res.status(200).json(updatedList);
		} catch (err) {
			res.status(422).json({ message: "Invalid list" });
		}
	}

	// Delete a list
	public static async delete(req: Request, res: Response): Promise<void> {
		try {
			const deletedList = await List.findByIdAndDelete(req.params.id);
			if (!deletedList) {
				res.status(404).json({ message: "List not found" });

				return;
			}
			res.status(200).json({ message: "List deleted" });
		} catch (err) {
			res.status(500).json({ message: "Error deleting the list" });
		}
	}
}
