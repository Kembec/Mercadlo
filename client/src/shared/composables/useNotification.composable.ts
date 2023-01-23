import { useNotification } from "@/stores/notification.store";

//Pinia
const notificationStore = useNotification();
const { newNotification } = notificationStore;

export default newNotification;
