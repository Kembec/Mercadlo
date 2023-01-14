import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useNotification = defineStore("notification", () => {
	//State
	const notification = ref<String>("");

	//Actions
	const newNotification = (n: String): void => {
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
		getNotification: computed( () => notification.value),
	};
});
