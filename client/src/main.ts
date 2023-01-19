import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAt, faChevronLeft, faEye, faEyeSlash, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faKey, faChevronLeft, faAt, faEye, faEyeSlash);

// Components
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
