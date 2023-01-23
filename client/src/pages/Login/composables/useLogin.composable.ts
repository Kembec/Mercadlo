import type { AxiosError } from "axios";
import { useUser } from "@/stores/user.store";
import newNotification from "@/shared/composables/useNotification.composable";
import api from "@/shared/api/api";

//Pinia
export const login = async (email: string, password: string): Promise<boolean> => {
	try {
		const validatorError = validator(email, password);
		if (validatorError) {
			throw new Error(validatorError);
		}
		const { data } = await api.post(`users/login`, { email, password });
		console.log(data);
		if (!data._id) {
			throw new Error("Error with server");
		}

		const userStore = useUser();
		const { newUser } = userStore;
		newUser(data);

		return true;
	} catch (e) {
		console.log(e);
		let res = (e as AxiosError).response;
		let error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
		return false;
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
