import { useNotification } from "@/stores/notification";

//Pinia
const notificationStore = useNotification();
const { newNotification } = notificationStore;

export default newNotification;
