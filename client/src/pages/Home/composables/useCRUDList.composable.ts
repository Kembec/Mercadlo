import type { AxiosError } from "axios";

import api from "@/shared/api/api";
import newNotification from "@/shared/composables/useNotification.composable";

import type { IList } from "../interfaces/list.interfaces";

export const addList = async (name: string | undefined): Promise<boolean> => {
	try {
		if (!name) {
			throw new Error("Name is required");
		}
		const { data } = await api.post("/lists", { name });
		if (!data.name) {
			throw new Error("There was a server error");
		}
		newNotification("List added successfully");
		return true;
	} catch (e) {
		const res = (e as AxiosError).response;
		const error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
		return false;
	}
};

export const getLists = async (): Promise<IList[]> => {
	try {
		const { data } = await api.get("/lists");
		return data;
	} catch (e) {
		const res = (e as AxiosError).response;
		const error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
		return [];
	}
};

export const updateList = async (id: string, name: string): Promise<boolean> => {
	try {
		const { data } = await api.put(`/lists/${id}`, { name });
		newNotification("List added successfully");
		return true;
	} catch (e) {
		const res = (e as AxiosError).response;
		const error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
		return false;
	}
};

export const deleteList = async (id: string): Promise<boolean> => {
	try {
		const { data } = await api.delete(`/lists/${id}`);
		if (!data.message) {
			newNotification("There was a server error");
			return false;
		}
		newNotification("List removed successfully");
		return true;
	} catch (e) {
		const res = (e as AxiosError).response;
		const error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
		return false;
	}
};
