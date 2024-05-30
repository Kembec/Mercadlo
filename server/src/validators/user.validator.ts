import Validator from "validator";

interface Errors {
	name?: string;
	email?: string;
	password?: string;
}

export function validateRegisterInput<T extends { [key: string]: string }>(
	data: T
): { errors: Errors; isValid: boolean } {
	const errors: Errors = {};

	if (Validator.isEmpty(data.name)) {
		errors.name = "Name is required";
	}
	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = "Name must be between 2 and 30 characters";
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = "Email is required";
	}
	if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password is required";
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be at least 6 characters";
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0,
	};
}

export function validateLoginInput<T extends { [key: string]: string }>(data: T): { errors: Errors; isValid: boolean } {
	const errors: Errors = {};

	if (Validator.isEmpty(data.email)) {
		errors.email = "Email is required";
	}
	if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password is required";
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0,
	};
}
