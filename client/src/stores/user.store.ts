import { ref, computed, onBeforeMount } from "vue";
import { defineStore } from "pinia";
import type { IUser } from "./interfaces/user.interface";

export const useUser = defineStore("user", () => {
	//BeforeMount
	onBeforeMount(() => {
		if (localStorage.user) {
			user.value = JSON.parse(localStorage.user);
		}
	});

	//State
	const user = ref<IUser>();

	//Actions
	const newUser = (u: IUser): void => {
		user.value = u;
		localStorage.user = JSON.stringify(u);
	};

	//Getters
	return {
		//State
		user,
		//Actions
		newUser,
		//Getters
		getUser: computed(() => user.value),
	};
});
