import { Request, Response } from "express";
import { List } from "../models/list.model";

export class ListController {
	// Get all lists
	public static async getAll(req: Request, res: Response) {
		try {
			const lists = await List.find({user_id: req.body.user_id});
			res.status(200).json(lists);
		} catch (err) {
			res.status(500).json({ message: "Error getting the lists" });
		}
	}

	// Get a list by ID
	public static async getById(req: Request, res: Response) {
		try {
			const list = await List.findById(req.params.id);
			if (!list) {
				return res.status(404).json({ message: "List not found" });
			}
			res.status(200).json(list);
		} catch (err) {
			res.status(500).json({ message: "Error getting the list" });
		}
	}

	// Add a new list
	public static async add(req: Request, res: Response) {
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
	public static async update(req: Request, res: Response) {
		try {
			const updatedList = await List.findByIdAndUpdate(
				req.params.id,
				{
					name: req.body.name,
				},
				{ new: true, runValidators: true }
			);
			if (!updatedList) {
				return res.status(404).json({ message: "List not found" });
			}
			res.status(200).json(updatedList);
		} catch (err) {
			res.status(422).json({ message: "Invalid list" });
		}
	}

	// Delete a list
	public static async delete(req: Request, res: Response) {
		try {
			const deletedList = await List.findByIdAndDelete(req.params.id);
			if (!deletedList) {
				return res.status(404).json({ message: "List not found" });
			}
			res.status(200).json({ message: "List deleted" });
		} catch (err) {
			res.status(500).json({ message: "Error deleting the list" });
		}
	}
}
