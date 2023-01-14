import jwt from 'jsonwebtoken';
import type { RouteLocationNormalized, NavigationGuard } from 'vue-router';

export const handleToken: NavigationGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: (to?: string | void | undefined) => void): Promise<void> => {
	try { 
		const cache = await caches.open("my-cache");
		const cachedResponse = await cache.match("token");
		if (!cachedResponse) {
			return next("/login");
		}
        const token = await cachedResponse.text();
        const decoded = await jwt.verify(token, import.meta.env.VITE_SECRET_KEY ?? "");
        if (!decoded) {
            return next("/login");
        } 
        next();
	} catch (err) {
		next("/login");
	}
};
