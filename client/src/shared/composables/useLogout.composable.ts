import type { AxiosError } from "axios";
import newNotification from "@/shared/composables/useNotification.composable";
import api from "@/shared/api/api";

export const logout = async (): Promise<boolean> => {
	try {
		const { data } = await api.post(`users/logout`);
		if (!data.message) {
			throw new Error("Error with server");
		}
		localStorage.removeItem("user");
		return true;
	} catch (e) {
		let res = (e as AxiosError).response;
		let error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
		return false;
	}
};
