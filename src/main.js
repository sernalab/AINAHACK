/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
import VCalendar from "v-calendar";
import "v-calendar/style.css";

// Components
import App from "./App.vue";
import router from "./router";

// Composables
import { createApp } from "vue";

const app = createApp(App);

registerPlugins(app);
app.use(VCalendar, {});
app.use(router);
app.mount("#app");
