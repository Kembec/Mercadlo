import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import useCreateToken from "../composables/useCreateToken";
import { User } from "../models/user.model";
import { validateLoginInput, validateRegisterInput } from "../validators/user.validator";

interface UserRequest extends Request {
	body: {
		user_id: string;
		name: string;
		email: string;
		password: string;
	};
}

export class UserController {
	public static async register(req: UserRequest, res: Response): Promise<void> {
		// Validate request body
		const { errors, isValid } = validateRegisterInput<typeof req.body>(req.body);

		if (!isValid) {
			res.status(400).json(errors);

			return;
		}

		// Check if the email is already in use
		const emailExists = await User.findOne({ email: req.body.email });
		if (emailExists) {
			errors.email = "Email already exists";

			res.status(400).json(errors);

			return;
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// Create a new user
		try {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
			});
			// Save the user to the database
			const savedUser = await newUser.save();
			res.status(201).json({ name: savedUser.name, email: savedUser.email });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Error registering the user" });
		}
	}

	// Login a user
	public static async login(req: UserRequest, res: Response): Promise<void> {
		// Validate request body
		const { errors, isValid } = validateLoginInput(req.body);
		if (!isValid) {
			res.status(400).json(errors);

			return;
		}

		// Check if the email exists
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			res.status(404).json({ message: "Invalid email or password" });

			return;
		}

		// Check if the password is correct
		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			res.status(404).json({ message: "Invalid email or password" });

			return;
		}

		// Create a JWT
		const token = useCreateToken(user);
		const time = 6 * 60 * 60 * 1000;
		res.cookie("token", token, { httpOnly: true, maxAge: time });
		res.cookie("_token", "_", { maxAge: time });

		// Return the token
		const data = {
			message: "Login successful",
			_id: user._id,
			name: user.name,
			email: user.email,
		};
		res.status(200).json(data);
	}

	// Logout a user
	public static logout(req: UserRequest, res: Response): void {
		res.clearCookie("token");
		res.clearCookie("_token");

		res.status(200).json({ message: "Logout successful" });
	}
}
