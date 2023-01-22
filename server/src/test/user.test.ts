import request from "supertest";
import { User } from "../models/user.model";
import { app } from "../../app";
import { INewUser } from "../interfaces/models/user.interface";

describe("User routes", () => {
	let newUser: INewUser;

	beforeAll(async () => {
		newUser = {
			name: "Test2",
			email: "test2@test.com",
			password: "passwordTest2",
		};
	});

	afterAll(async () => {
		await User.deleteMany({});
	});

	describe("POST /users/register", () => {
		it("should create a new user", async () => {
			const res = await request(app).post("/users/register").send({
				email: newUser.email,
				name: newUser.name,
				password: newUser.password,
			});

			expect(res.status).toBe(201);
			expect(res.body).toEqual({
				name: newUser.name,
				email: newUser.email,
			});
		});

		it("should return a 400 if the email is invalid", async () => {
			const res = await request(app).post("/users/register").send({
				name: newUser.name,
				password: newUser.password,
			});

			expect(res.status).toBe(400);
			expect(res.body).toEqual({ email: "Email is invalid" });
		});

		it("should return a 400 if the name is invalid", async () => {
			const res = await request(app).post("/users/register").send({
				email: newUser.email,
				password: newUser.password,
			});

			expect(res.status).toBe(400);
			expect(res.body).toEqual({ name: "Name must be between 2 and 30 characters" });
		});

		it("should return a 400 if the password is invalid", async () => {
			const res = await request(app).post("/users/register").send({
				name: newUser.name,
				email: newUser.email,
			});

			expect(res.status).toBe(400);
			expect(res.body).toEqual({ password: "Password must be at least 6 characters" });
		});
	});

	describe("POST /users/login", () => {
		it("should login a user", async () => {
			const res = await request(app).post("/users/login").send({
				email: newUser.email,
				password: newUser.password,
			});

			expect(res.status).toBe(200);
			expect(res.body).toEqual({ 
				token: expect.any(String),
			});
		});

		it("should return a 404 if the password is invalid", async () => {
			const res = await request(app).post("/users/login").send({
				email: newUser.email,
				password: "invalid",
			});

			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: "Invalid email or password" });
		});

		it("should return a 404 if the email is invalid", async () => {
			const res = await request(app).post("/users/login").send({
				email: "invalid@example.com",
				password: newUser.password,
			});

			expect(res.status).toBe(404);
			expect(res.body).toEqual({ message: "Invalid email or password" });
		});
	});
});
