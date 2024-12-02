import "./assets/main.css";
import { theme } from "./assets/theme";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// dayjs
import DayJsADapter from "@date-io/dayjs";

const app = createApp(App);

const vuetify = createVuetify({
  theme,
  icons: {
    defaultSet: "mdi",
  },
  date: {
    adapter: DayJsADapter,
  },
  components,
  directives,
});

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
