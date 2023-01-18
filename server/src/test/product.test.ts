import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { IListModel } from "../interfaces/models/list.interface";
import { IProductModel, INewProduct } from "../interfaces/models/product.interface";
import { IUserModel } from "../interfaces/models/user.interface";
import { List } from "../models/list.model";
import { Product } from "../models/product.model"
import { User } from "../models/user.model"
import useCreateToken from "../composables/useCreateToken";


describe("Product routes", () => {
	let list: IListModel;
	let newProduct: INewProduct;
	let product: IProductModel;
	let user: IUserModel;
	let TOKEN: string;

	beforeAll(async () => {
		user = new User({
			name: "Test",
			email: "test@test.com",
			password: "passwordTest",
		});
		await user.save();

		TOKEN = useCreateToken(user);

		list = new List({
			items: [],
			name: "List Test",
			user_id: user._id,
		});
		await list.save();

		product = new Product({
			list_id: list._id,
			name: "Apple",
			price: 0.99,
		});
		await product.save();
	
		newProduct = {
			__v: product.__v,
			_id: product._id.toString(),
			list_id: list._id.toString(),
			name: product.name,
			price: product.price,
		};
	})
	
	afterAll(async() => {
		await Product.deleteMany({});
		await List.deleteMany({});
		await User.deleteMany({});
	})

	describe("GET /products", () => {
		it("should return a list of products", async () => {
			const res = await request(app).get(`/products/${list._id}`).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(200);
			expect(res.body).toEqual([newProduct]);
		});

		it("should return a 404 if the list is not found", async () => {
			const randomId = new mongoose.Types.ObjectId();
			const res = await request(app).get(`/products/${randomId}`).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: "List not found" });
		});
	});

	describe("GET /products/:id", () => {
		it("should return a single product", async () => {
			const res = await request(app).get(`/products/${list._id}/${newProduct._id}`).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(200);
			expect(res.body).toEqual(newProduct);
		});

		it("should return a 404 if the product is not found", async () => {
			const randomId = new mongoose.Types.ObjectId();
			const res = await request(app).get(`/products/${list._id}/${randomId}`).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: "Product not found" });
		});
	});

	describe("POST /products", () => {
		const p = {
			name: "Banana",
			price: 0.79,
		}
		it("should create a new product", async () => {
			const res = await request(app).post(`/products/${list._id}`).send(p).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(201);
			expect(res.body).toEqual({
				...p,
				__v: expect.any(Number),
				_id: expect.any(String),
				list_id: list._id.toString(),
			});
		});

		it("should return a 422 if the product is invalid", async () => {
			const res = await request(app).post(`/products/${list._id}`).send({
				name: p.name,
			}).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(422);
			expect(res.body).toEqual({ message: "Invalid product" });
		});
	});

	describe("PUT /products/:id", () => {
		const pu = {
			name: "Orange",
			price: 0.99,
		}
		it("should update an existing product", async () => {
			const res = await request(app).put(`/products/${list._id}/${newProduct._id}`).send(pu).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(200);
			expect(res.body).toEqual({
				...pu,
				__v: expect.any(Number),
				_id: expect.any(String),
				list_id: list._id.toString(),
			});
		});

		it("should return a 404 if the product is not found", async () => {
			const randomId = new mongoose.Types.ObjectId();
			const res = await request(app).put(`/products/${list._id}/${randomId}`).send(pu).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: "Product not found" });
		});

		it("should return a 422 if the product is invalid", async () => {
			const res = await request(app).put(`/products/${list._id}/${product._id}`).send({}).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(422);
			expect(res.body).toEqual({ message: "Invalid product" });
		});
	});

	describe("DELETE /products/:id", () => {
		it("should delete an existing product", async () => {
			const res = await request(app).delete(`/products/${list._id}/${product._id}`).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(200);
			expect(res.body).toEqual({ message: "Product deleted" });
		});

		it("should return a 404 if the product is not found", async () => {
			const randomId = new mongoose.Types.ObjectId();
			const res = await request(app).delete(`/products/${list._id}/${randomId}`).set('Cookie', `token=${TOKEN}`);

			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: "Product not found" });
		});
	});
});
