import type { AxiosError } from "axios";

import api from "@/shared/api/api";
import newNotification from "@/shared/composables/useNotification.composable";

export const logout = async (): Promise<boolean> => {
	try {
		const { data } = await api.post(`users/logout`);
		if (!data.message) {
			throw new Error("Error with server");
		}
		localStorage.removeItem("user");
		return true;
	} catch (e) {
		const res = (e as AxiosError).response;
		const error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
		return false;
	}
};
