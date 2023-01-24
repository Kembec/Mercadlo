import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useNotification = defineStore("notification", () => {
	//State
	const notification = ref<string>("");

	//Actions
	const newNotification = (n: string): void => {
		notification.value = n;
		//Clear notification
		setTimeout(() => {
			notification.value = "";
		}, 5000);
	};

	//Getters

	return {
		//State
		notification,
		//Actions
		newNotification,
		//Getters
		getNotification: computed(() => notification.value),
	};
});
