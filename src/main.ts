import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";

import { router } from "./router.js";
import App from "./App.vue";

const app = createApp(App);
const head = createHead();

app.use(createPinia());
app.use(head);
app.use(router);
app.mount("#app");
