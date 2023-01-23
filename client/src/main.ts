import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
