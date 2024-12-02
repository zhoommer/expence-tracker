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

// locale
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

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

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    tr,
  },
});

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);

app.mount("#app");