import type { RouteLocationNormalized, NavigationGuard } from "vue-router";
import Cookies from "js-cookie";

export const handleToken: NavigationGuard = async (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: (to?: string | void | undefined) => void
): Promise<void> => {
	try {
		const token = Cookies.get("_token");
		if (!token && to.path != "/login") {
			return next("login");
		} else if (token && to.path === "/login") {
			return next("/");
		}
		next();
	} catch (e) {
		console.log(e);
	}
};
