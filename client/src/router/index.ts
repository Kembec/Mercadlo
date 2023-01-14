import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue';
import { handleToken } from '@/middleware/handleToken';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomePage, beforeEnter: handleToken  },

    //Default
		{ path: "/:any(.*)*", redirect: () => ({ name: "home" }) },
  ]
})

export default router
