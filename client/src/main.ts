import "./assets/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faAt,
	faBell,
	faBox,
	faChevronDown,
	faChevronLeft,
	faChevronUp,
	faDollar,
	faEye,
	faEyeSlash,
	faKey,
	faPencil,
	faPlus,
	faTimes,
	faTrash,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
	faUser,
	faKey,
	faChevronLeft,
	faAt,
	faEye,
	faEyeSlash,
	faPlus,
	faTrash,
	faPencil,
	faChevronDown,
	faChevronUp,
	faDollar,
	faBox,
	faTimes,
	faBell
);

// Components
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
