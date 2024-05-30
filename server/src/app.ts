/* eslint-disable no-console */
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { handle404 } from "./middleware/handle404";
import { handleCORS } from "./middleware/handleCORS";
import { handleErrors } from "./middleware/handleErrors";
import { listRoutes } from "./routes/list.routes";
import { productRoutes } from "./routes/product.routes";
import { userRoutes } from "./routes/user.routes";

dotenv.config();
const result = dotenv.config();

if (result.error) {
	throw result.error;
}

export const app = express();

// Connect to the database
mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URI ?? "")
	.then(() => {
		console.log("Database connected successfully");
	})
	.catch((error: Error) => {
		console.error("Database connection error:", error);
	});

// Enable body parser to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Enable CORS
app.use(handleCORS);

// Use routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/lists", listRoutes);

// Handle invalid routes
app.use(handle404);

// Handle errors
app.use(handleErrors);

if (process.env.NODE_ENV !== "test") {
	app.listen(process.env.NODE_PORT, () => console.log(`Listening on port ${process.env.NODE_PORT}`));
}
