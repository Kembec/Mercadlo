import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { userRoutes } from "./src/routes/user.routes";
import { productRoutes } from "./src/routes/product.routes";
import { listRoutes } from "./src/routes/list.routes";
import { handleCORS } from "./src/middleware/handleCORS";
import { handle404 } from "./src/middleware/handle404";
import { handleErrors } from "./src/middleware/handleErrors";

dotenv.config();
const result = dotenv.config();

if (result.error) {
	throw result.error;
}

export const app = express();

// Connect to the database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI ?? "");

// Enable body parser to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

if (process.env.NODE_ENV !== 'test') {
	app.listen(process.env.NODE_PORT, () => console.log(`Listening on port ${process.env.NODE_PORT}`));
}

