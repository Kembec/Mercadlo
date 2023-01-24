import type { AxiosError } from "axios";

import api from "@/shared/api/api";
import newNotification from "@/shared/composables/useNotification.composable";
import { useUser } from "@/stores/user.store";

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
		const res = (e as AxiosError).response;
		const error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
		return false;
	}
};

const validator = (email: string, password: string): string | undefined => {
	const regex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
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
