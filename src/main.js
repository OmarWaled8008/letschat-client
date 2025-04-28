import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/router.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "vue3-toastify/dist/index.css";
import "./main.css";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount("#app");
