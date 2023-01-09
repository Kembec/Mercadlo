import Validator from "validator";

export function validateRegisterInput(data: any) {
	let errors: any = {};
	data.name = !data.name ? "" : data.name;
	data.email = !data.email ? "" : data.email;
	data.password = !data.password ? "" : data.password;
	data.password2 = !data.password2 ? "" : data.password2;

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

export function validateLoginInput(data: any) {
	let errors: any = {};
	data.email = !data.email ? "" : data.email;
	data.password = !data.password ? "" : data.password;

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
