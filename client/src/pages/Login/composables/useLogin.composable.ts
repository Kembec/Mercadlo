import type { AxiosError } from "axios";
import newNotification from "@/shared/composables/useNotification.composable";
import api from "@/shared/api/api";

export const login = async (email: string, password: string): Promise<void> => {
	try {
		const validatorError = validator(email, password);
		if (validatorError) {
			throw new Error(validatorError);
		}
		const { data } = await api.post(`users/login`, { email, password });
		if (!data.token) {
			throw new Error("Error with server");
		}
	} catch (e) {
		let res = (e as AxiosError).response;
		let error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
	}
};

const validator = (email: string, password: string): string | undefined => {
	const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (!email) {
		return "Email is required";
	}
	if (!password) {
		return "Password is required";
	}
	if (!email.match(regex)) {
		return "Email is invalid";
	}
};
