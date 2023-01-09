import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { IListModel, INewList } from "../interfaces/models/list.interface";
import { IUserModel } from "../interfaces/models/user.interface";
import { List } from "../models/list.model";
import { User } from "../models/user.model"

describe("List routes", () => {
	let user: IUserModel;
	let list: IListModel;
	let newList: INewList;
	let TOKEN: string;

	beforeAll(async () => {
		user = new User({
			email: "test@test.com",
			name: "Test",
			password: "passwordTest",
		});
		await user.save();

		TOKEN = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, {expiresIn: "1h"});

		list = new List({
			items: [],
			name: "List Test",
			user_id: user._id,
		});
		await list.save();

		newList = {
			__v: list.__v,
			_id: list._id.toString(),
			items: list.items,
			name: list.name,
			user_id: list.user_id.toString(),
		}
	});

	afterAll(async () => {
		await List.deleteMany({});
		await User.deleteMany({});
	});

	describe("GET /lists", () => {
		it("should return a list of lists", async () => {
			const res = await request(app).get("/lists").set('Authorization', TOKEN);

			expect(res.status).toBe(200);
			expect(res.body).toEqual([newList]);
		});
	});

	describe("GET /lists/:id", () => {
		it("should return a single list", async () => {
			const res = await request(app).get(`/lists/${list._id}`).set('Authorization', TOKEN);

			expect(res.status).toBe(200);
			expect(res.body).toEqual(newList);
		});

		it("should return a 404 if the list is not found", async () => {
			const randomId = new mongoose.Types.ObjectId();
			const res = await request(app).get(`/lists/${randomId}`).set('Authorization', TOKEN);

			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: "List not found" });
		});
	});

	describe("POST /lists", () => {
		it("should create a new list", async () => {
			const res = await request(app)
				.post("/lists")
				.send({
					name: "Weekend list",
				}).set('Authorization', TOKEN);

			expect(res.status).toBe(201);
			expect(res.body).toEqual({
				__v: expect.any(Number),
				_id: expect.any(String),
				items: [],
				name: "Weekend list",
				user_id: user._id.toString(),
			});
		});

		it("should return a 422 if the list is invalid", async () => {
			const res = await request(app).post("/lists").send({}).set('Authorization', TOKEN);

			expect(res.status).toBe(422);
			expect(res.body).toEqual({ message: "Invalid list" });
		});
	});

	describe("PUT /lists/:id", () => {
		it("should update an existing list", async () => {
			const res = await request(app)
				.put(`/lists/${newList._id}`)
				.send({
					name: "Weekly grocery list",
				}).set('Authorization', TOKEN);

			expect(res.status).toBe(200);
			expect(res.body).toEqual({
				__v: expect.any(Number),
				_id: expect.any(String),
				items: [],
				name: "Weekly grocery list",
				user_id: user._id.toString(),
			});
		});

		it("should return a 404 if the list is not found", async () => {
			const randomId = new mongoose.Types.ObjectId();
			const res = await request(app)
				.put(`/lists/${randomId}`)
				.send({
					name: "Weekly grocery list",
				}).set('Authorization', TOKEN);

			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: "List not found" });
		});

		it("should return a 422 if the list is invalid", async () => {
			const res = await request(app)
				.put(`/lists/${list._id}`)
				.send({
					items: [{ name: "Apple", price: 0.99 }],
				}).set('Authorization', TOKEN);

			expect(res.status).toBe(422);
			expect(res.body).toEqual({ message: "Invalid list" });
		});
	});

	describe("DELETE /lists/:id", () => {
		it("should delete an existing list", async () => {
			const res = await request(app).delete(`/lists/${list._id}`).set('Authorization', TOKEN);

			expect(res.status).toBe(200);
			expect(res.body).toEqual({message: "List deleted"});
		})

		it("should return a 404 if the list is not found", async () => {
			const randomId = new mongoose.Types.ObjectId();
			const res = await request(app).delete(`/lists/${randomId}`).set('Authorization', TOKEN);

			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: "List not found" });
		});
	});
});
