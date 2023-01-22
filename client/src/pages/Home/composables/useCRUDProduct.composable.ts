import api from "@/shared/api/api";
import newNotification from "@/shared/composables/useNotification.composable";
import type { AxiosError } from "axios";
import type { IProduct } from "../interfaces/product.interface";


export const addProduct = async (list_id: string, name: string, price: number) : Promise<boolean> => {
	try {
		const { data } = await api.post(`/products/${list_id}`, { name, price });
		newNotification("Product added successfully");
        return true;
	} catch (e) {
		let res = (e as AxiosError).response;
		let error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
        return false;
	}
};

export const getProducts = async (list_id: string) : Promise<IProduct[]> => {
	try {
		const { data } = await api.get(`/products/${list_id}`);
		return data;
	} catch (e) {
		let res = (e as AxiosError).response;
		let error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
		return [];
	}
};

export const updateProduct = async (list_id: string, id: string, name: string, price: number) : Promise<boolean> => {
	try {
		const { data } = await api.put(`/products/${list_id}/${id}`, { name, price });
		newNotification("Product updated successfully");
        return true;
	} catch (e) {
		let res = (e as AxiosError).response;
		let error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
        return false;
	}
};

export const deleteProduct = async (list_id: string, id: string) : Promise<boolean> => {
	try {
		const { data } = await api.delete(`/products/${list_id}/${id}`);
		newNotification("Product removed successfully");
        return true;
	} catch (e) {
		let res = (e as AxiosError).response;
		let error = res ? (res.data as { message: string }).message : "";
		newNotification(error);
        return false;
	}
};
