import { createRouter, createWebHistory } from "vue-router";

import { handleToken } from "@/middleware/handleToken";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", name: "home", component: HomePage },

		//Auth
		{ path: "/login", name: "login", component: LoginPage },

		//Default
		{ path: "/:any(.*)*", redirect: () => ({ name: "home" }) },
	],
});
router.beforeEach(handleToken);

export default router;
