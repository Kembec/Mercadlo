import type { AxiosError } from "axios";
import api from "@/shared/api/api";
import newNotification from "@/shared/composables/useNotification.composable";

export const register = async (name: string, email: string, password: string): Promise<boolean> => {
	try {
		const validatorError = validator(name, email, password);
		if (validatorError) {
			throw new Error(validatorError);
		}
		const { data } = await api.post(`/users/register`, { name, email, password });
		if (!data.name || !data.email) {
			throw new Error("Error with server");
		}
		newNotification("Registered user successfully.");
		return true;
	} catch (e) {
		let res = (e as AxiosError).response;
		let error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
		return false;
	}
};

const validator = (name: string, email: string, password: string): string | undefined => {
	const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (!name) {
		return "Name is required";
	}
	if (!email) {
		return "Email is required";
	}
	if (!email.match(regex)) {
		return "Email is invalid";
	}
	if (!password) {
		return "Password is required";
	}
	if (password.length < 8) {
		return "El password debe contener al menos 6 caracteres";
	}
};
